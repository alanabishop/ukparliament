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
    firstName: HTMLHeadingElement | null;
    cardInner: HTMLDivElement | null;
    spinner: HTMLDivElement | null;
    partyName: HTMLParagraphElement | null;
    constituency: HTMLParagraphElement | null;
    thumbnailImage: HTMLImageElement | null;
    servingNotice: HTMLDivElement | null;
    thumbnail: HTMLElement | null;
  } = {
    errorMessage: null,
    firstName: null,
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
      firstName: document.querySelector(`.card__displayName`),
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
      if (!response.ok) throw new Error("No member has been found with ID");

      const data: TeamMember = await response.json();

      this.populateTeamData(data);
      this.showContent();
    } catch (error) {
      this.showErrorMessage();
      console.error("Failed to fetch team data:", error);
    }
    this.hideSpinner();
  }

  private populateTeamData(member: TeamMember) {
    const { nameDisplayAs, latestParty, latestHouseMembership, thumbnailUrl } =
      member.value;

    const dataMap = {
      firstName: nameDisplayAs,
      partyName: latestParty.name,
      constituency: latestHouseMembership.membershipFrom,
    };

    for (const [key, value] of Object.entries(dataMap)) {
      const element = this.domElements[key as keyof typeof this.domElements];

      if (element) {
        element.textContent = value;
      } else {
        this.displayConsoleWarning(`.card__${key}`);
      }
    }

    if (latestParty.backgroundColour && this.domElements.thumbnail) {
      console.log(latestParty.backgroundColour);
      this.domElements.thumbnail.style.borderColor = `#${latestParty.backgroundColour}`;
    }

    if (this.domElements.thumbnailImage) {
      this.domElements.thumbnailImage.src = thumbnailUrl;
    } else {
      this.displayConsoleWarning(".card__thumbnailImage");
    }

    const { membershipEndDate } = latestHouseMembership;

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
    } else {
      this.displayConsoleWarning(".card__inner");
    }

    this.hideSpinner();
  }

  private displayConsoleWarning(element: string) {
    console.warn(`Element '${element} not found in the DOM.`);
  }

  showErrorMessage() {
    this.domElements.errorMessage.style.display = "block";
    this.domElements.cardInner.style.display = "hidden";
    this.hideSpinner();
  }

  hideSpinner() {
    this.domElements.spinner.style.display = "none";
  }
}

new Main();
