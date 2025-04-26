interface TeamMember {
  value: {
    nameDisplayAs: string;
    latestParty: {
      name: string;
      backgroundColour: string;
    };
    latestHouseMembership: {
      membershipFrom: string;
      membershipEndDate: string;
    };
    thumbnailUrl: string;
  };
}

class Main {
  private baseUrl = "https://members-api.parliament.uk/api/Members";
  private memberId: string | null = null;

  private domElements: {
    errorMessage: HTMLParagraphElement | null;
    displayName: HTMLHeadingElement | null;
    cardInner: HTMLDivElement | null;
    spinner: HTMLDivElement | null;
    partyName: HTMLParagraphElement | null;
    constituency: HTMLParagraphElement | null;
    thumbnailImage: HTMLImageElement | null;
    servingNotice: HTMLDivElement | null;
    thumbnail: HTMLElement | null;
  } = {
    errorMessage: null,
    displayName: null,
    cardInner: null,
    spinner: null,
    partyName: null,
    constituency: null,
    thumbnailImage: null,
    servingNotice: null,
    thumbnail: null,
  };

  constructor() {
    this.getDomElements();
    this.init();
  }

  getDomElements() {
    this.domElements = {
      errorMessage: document.querySelector(".card__error"),
      cardInner: document.querySelector(".card__inner"),
      displayName: document.querySelector(".card__displayName"),
      spinner: document.querySelector(".card__spinner"),
      partyName: document.querySelector(".card__partyName"),
      constituency: document.querySelector(".card__constituency"),
      thumbnailImage: document.querySelector(".card__thumbnailImage"),
      servingNotice: document.querySelector(".card__servingNotice"),
      thumbnail: document.querySelector(".card__thumbnail"),
    };
  }

  private init() {
    this.memberId = this.getMemberIdFromURL();
    if (this.memberId) {
      this.fetchTeamData(this.memberId);
    } else {
      console.error("No member ID found in the URL.");
      this.showErrorMessage();
    }
  }

  private getMemberIdFromURL(): string | null {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
  }

  private async fetchTeamData(id: string): Promise<void> {
    const apiUrl = `${this.baseUrl}/${id}`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok)
        throw new Error(
          `Member not found. Status: ${response.status}, ID: ${id}`
        );

      const data: TeamMember = await response.json();

      this.populateTeamData(data);
      this.showContent();
    } catch (error) {
      this.showErrorMessage();
      console.error("Failed to fetch team data:", error);
    }
  }

  private populateTeamData(member: TeamMember) {
    const { nameDisplayAs, latestParty, latestHouseMembership, thumbnailUrl } =
      member.value;

    this.setTextContent({
      displayName: nameDisplayAs,
      partyName: latestParty.name,
      constituency: latestHouseMembership.membershipFrom,
    });

    this.setThumbnailImage(thumbnailUrl);
    this.setPartyBorderColor(latestParty.backgroundColour);
    this.setServingNotice(latestHouseMembership.membershipEndDate);
  }

  private setTextContent(dataMap: { [key: string]: string }) {
    for (const [key, value] of Object.entries(dataMap)) {
      const element = this.domElements[key as keyof typeof this.domElements];
      if (element && value) {
        element.textContent = value;
      }
    }
  }

  private setThumbnailImage(url: string) {
    if (this.domElements.thumbnailImage && url) {
      this.domElements.thumbnailImage.src = url;
    }
  }

  private setPartyBorderColor(color: string) {
    if (color && this.domElements.thumbnail) {
      this.domElements.thumbnail.style.borderColor = `#${color}`;
    }
  }

  private setServingNotice(membershipEndDate: string) {
    if (
      membershipEndDate &&
      new Date(membershipEndDate) < new Date() &&
      this.domElements.servingNotice
    ) {
      this.domElements.servingNotice.style.display = "block";
    }
  }

  private showContent() {
    if (this.domElements.cardInner) {
      this.domElements.cardInner.style.display = "flex";
    }

    this.hideSpinner();
  }

  private showErrorMessage() {
    if (this.domElements.errorMessage) {
      this.domElements.errorMessage.style.display = "block";
    }
    if (this.domElements.cardInner) {
      this.domElements.cardInner.style.display = "none";
    }
    this.hideSpinner();
  }

  private hideSpinner() {
    if (this.domElements.spinner) {
      this.domElements.spinner.style.display = "none";
    }
  }
}

new Main();
