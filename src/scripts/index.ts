/** Our main application class, extend this as needed. */
class Main {
  private readonly verificationLog: string = "Hello world!";

  constructor() {
    // Verify the application is running as intended by viewing this log in your
    // browser's development console. Feel free to delete this log once confirmed.
    console.log(this.verificationLog);
  }
}

new Main();
