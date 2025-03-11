import assert from "assert";
import { Given, When, Then } from "@cucumber/cucumber";

function isItFriday(today: string): string {
  if (today === "Friday") {
    return "TGIF";
  } else {
    return "Nope";
  }
}

Given("today is {string}", function (this: any, givenDay: string) {
  this.today = givenDay;
});

When("I ask whether it's Friday yet", function (this: any) {
  this.actualAnswer = isItFriday(this.today);
});

Then("I should be told {string}", function (this: any, expectedAnswer: string) {
  assert.strictEqual(this.actualAnswer, expectedAnswer);
});
