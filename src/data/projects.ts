export type AgeBand = "5-6" | "6-7" | "7-8" | "8-9" | "9-10" | "10-11" | "11-12";

export type Project = {
  id: string;
  age: AgeBand;
  mode: "solo" | "team";
  title: string;
  minutes: number;
  need: string;
  steps: string[];
  done: string;
};

export const AGE_BANDS: AgeBand[] = ["5-6", "6-7", "7-8", "8-9", "9-10", "10-11", "11-12"];

function p(
  age: AgeBand,
  mode: "solo" | "team",
  title: string,
  minutes: number,
  need: string,
  steps: string[],
  done: string,
): Project {
  return { id: `${age}-${mode}-${title}`, age, mode, title, minutes, need, steps, done };
}

export const PROJECTS: Project[] = [
  p("5-6", "solo", "Color a state", 15, "A state page and crayons", [
    "Pick one state.",
    "Draw its outline, or use the map page.",
    "Color inside the lines.",
    "Leave the capital star red.",
  ], "The shape is colored and you can say the state name."),
  p("5-6", "solo", "Count 13 stripes", 10, "Paper and a red crayon", [
    "Draw 13 stripes.",
    "Color every other stripe red.",
    "Start and end with a red stripe.",
    "Count them out loud.",
  ], "You counted 13 stripes."),
  p("5-6", "solo", "Find the red star", 10, "One state page", [
    "Open a state page.",
    "Point to the red star.",
    "Say the capital out loud.",
  ], "You said the capital."),
  p("5-6", "solo", "Five big names", 10, "Paper and a pencil", [
    "Pick five states.",
    "Write each name in big letters.",
    "Read them to a grown-up.",
  ], "Five names are on your paper."),
  p("5-6", "solo", "Two states in boxes", 10, "The states map", [
    "Find Alaska.",
    "Find Hawaii.",
    "Say that both are states.",
    "Say they are not next to California.",
  ], "You pointed to both states."),
  p("5-6", "team", "Flag on the floor", 20, "Red, white, and blue paper", [
    "Make 13 stripes together.",
    "Put a blue box at the top.",
    "Count the stripes as a team.",
  ], "The team counted 13 stripes."),
  p("5-6", "team", "State parade", 15, "No supplies", [
    "Each child picks a different state.",
    "Line up.",
    "Each child says one state name.",
  ], "Every child said a state."),
  p("5-6", "team", "Capital echo", 15, "One state page", [
    "One child says a capital.",
    "The team repeats it.",
    "Do this for three states.",
  ], "The team said three capitals."),
  p("5-6", "team", "Red, white, and blue sort", 10, "Crayons or paper in those colors", [
    "Make three piles.",
    "Sort the red, the white, and the blue.",
    "Count each pile.",
  ], "The three piles are sorted."),

  p("6-7", "solo", "Nickname pairs", 15, "Paper and the states pages", [
    "Pick four states.",
    "Write the state and its nickname.",
    "Read one pair out loud.",
  ], "Four pairs are written."),
  p("6-7", "solo", "Draw an outline", 20, "Paper and one state page", [
    "Look at one state outline.",
    "Draw it on your paper.",
    "Add a red star for the capital.",
  ], "Your drawing looks like the state."),
  p("6-7", "solo", "The first president", 10, "The presidents list", [
    "Find George Washington.",
    "Say he was the first president.",
    "Find the years 1789 to 1797.",
  ], "You found Washington and his years."),
  p("6-7", "solo", "A nation name", 10, "The nations pages", [
    "Pick one nation.",
    "Say the name they use.",
    "Say one place their homelands are.",
  ], "You said the name and a place."),
  p("6-7", "solo", "Count to 50 by tens", 15, "Paper", [
    "Draw 10 stars.",
    "Do that five times.",
    "Count by tens: 10, 20, 30, 40, 50.",
  ], "You reached 50."),
  p("6-7", "team", "Two states, one difference", 20, "Two state pages", [
    "Open two state pages.",
    "Find the capitals.",
    "Say one way the states are different.",
  ], "The team said one difference."),
  p("6-7", "team", "Two hair styles", 15, "The president pages", [
    "Find Washington.",
    "Find Lincoln.",
    "Say one way their hair is different.",
  ], "The team said the difference."),
  p("6-7", "team", "Tap and read", 15, "The states map", [
    "Take turns.",
    "Tap a state.",
    "Read its name.",
  ], "Each child tapped one state."),
  p("6-7", "team", "Stripe and star poster", 25, "Big paper and crayons", [
    "Draw a flag together.",
    "Label the stripes with the number 13.",
    "Label the stars with the number 50.",
  ], "The poster shows both numbers."),

  p("7-8", "solo", "Border buddies", 20, "One state page and paper", [
    "Pick a state.",
    "Write the states that touch it.",
    "If none touch it, write that down.",
  ], "Your list matches the page."),
  p("7-8", "solo", "Three presidents in order", 15, "Paper", [
    "Write Washington, Lincoln, and Obama on slips.",
    "Put them in time order.",
    "Say who came first.",
  ], "The order is right."),
  p("7-8", "solo", "Cover the capital", 15, "A state page and paper", [
    "Read a state name.",
    "Cover the capital and try to remember it.",
    "Uncover and check.",
  ], "You checked your answer."),
  p("7-8", "solo", "Not the same", 15, "Paper", [
    "Write one sentence.",
    "Say that a Native nation is not the same thing as a state.",
    "Read it to someone.",
  ], "Your sentence says they are not the same."),
  p("7-8", "solo", "The year 1959", 10, "The Alaska and Hawaii pages", [
    "Open Alaska and write the year.",
    "Open Hawaii and write the year.",
    "Circle what is the same.",
  ], "Both say 1959."),
  p("7-8", "team", "Border chain", 20, "Paper", [
    "Pick a state.",
    "Write a state that touches it.",
    "Then write a state that touches that one.",
  ], "The chain is three states long."),
  p("7-8", "team", "Five presidents in order", 20, "Slips of paper", [
    "Write five presidents on slips.",
    "Put the slips in order as a team.",
    "Check the presidents list.",
  ], "The slips are in the right order."),
  p("7-8", "team", "Region piles", 20, "Slips of paper", [
    "Write eight state names.",
    "Sort them into Northeast, Southeast, Midwest, and West.",
    "Check each state page.",
  ], "Each slip is in a pile."),
  p("7-8", "team", "One nation fact", 15, "One nation page", [
    "Read the page together.",
    "Pick one true thing to remember.",
    "Tell it in a short sentence.",
  ], "The team said the fact."),

  p("8-9", "solo", "Compare two states", 25, "Two state pages and paper", [
    "Make two columns.",
    "Write the capital, the year, the region, and one place.",
    "Circle one thing that is different.",
  ], "Both columns are filled."),
  p("8-9", "solo", "The capital city", 10, "The states page and paper", [
    "Find the card for Washington, D.C.",
    "Write why it is not one of the 50 states.",
  ], "Your sentence says it is the capital city."),
  p("8-9", "solo", "Term years", 20, "One president page", [
    "Write the president's name.",
    "Write each term with the start year.",
    "Write the end year, or Still in office.",
  ], "The terms match the page."),
  p("8-9", "solo", "Still here", 20, "One nation page and paper", [
    "Write where the homelands are.",
    "Write that many descendants live there now.",
  ], "Both ideas are in your note."),
  p("8-9", "solo", "Two numbers, one person", 15, "The Cleveland page", [
    "Read why he is the 22nd president.",
    "Read why he is also the 24th.",
    "Write two sentences about the two terms.",
  ], "Your note tells about both terms."),
  p("8-9", "team", "Teach and switch", 25, "Two state pages", [
    "Split into two groups.",
    "Each group learns one state.",
    "Teach the other group the capital.",
    "Then switch states.",
  ], "Each group can name the other capital."),
  p("8-9", "team", "Six steps", 20, "The time page and paper", [
    "Step through six screens.",
    "Write one sentence about nations.",
    "Write one sentence about states.",
  ], "You have both sentences."),
  p("8-9", "team", "Write four questions", 25, "Paper and this site", [
    "Write four questions.",
    "Give each question four choices.",
    "Mark the right answer.",
    "Use only facts from this site.",
  ], "Four questions are ready."),
  p("8-9", "team", "Seven red, six white", 15, "Paper", [
    "Draw the 13 stripes.",
    "Color 7 red and 6 white.",
    "Start with red.",
    "Show 50 as five groups of 10.",
  ], "The team can show both numbers."),

  p("9-10", "solo", "Four corners", 20, "The states map and paper", [
    "Find the place where four states meet.",
    "Name Arizona, Colorado, New Mexico, and Utah.",
    "Check the border lists.",
  ], "All four states are named."),
  p("9-10", "solo", "A family of presidents", 20, "The president pages", [
    "Find John Adams and John Quincy Adams.",
    "Or find the two Harrison presidents.",
    "Or find the two Bush presidents.",
    "Write how they are related.",
  ], "You named a real pair."),
  p("9-10", "solo", "Not old borders", 20, "The nations map and paper", [
    "Pick a culture region.",
    "Write that the shape is not a state line.",
    "Write that it is not an old border.",
  ], "Your note says both things."),
  p("9-10", "solo", "Still living", 15, "The president pages", [
    "Find three presidents who are still living.",
    "Write their names.",
    "Do not guess a death year.",
  ], "The three names match the pages."),
  p("9-10", "solo", "Three lines", 20, "One state page", [
    "Write the state symbol.",
    "Write one place a child can picture.",
    "Write the land or weather in a short line.",
  ], "Three lines are done."),
  p("9-10", "team", "A one-minute talk", 25, "One nation page", [
    "Plan a short talk.",
    "Include the name, the homeland, and one fact.",
    "End by saying many people live there now.",
  ], "The team gave the talk."),
  p("9-10", "team", "Order ten", 25, "Slips of paper", [
    "Write ten presidents.",
    "Put them in order from earliest to latest.",
    "Check the list.",
  ], "The order is right."),
  p("9-10", "team", "Coast to coast", 20, "The states map", [
    "Start in California.",
    "End in New York.",
    "Each state in the path must touch the next.",
  ], "The path connects."),
  p("9-10", "team", "Two terms, not in a row", 15, "The Cleveland and Trump pages", [
    "Read both pages.",
    "Explain how one person can have two numbers.",
    "Say the years.",
  ], "The team said it clearly."),

  p("10-11", "solo", "State briefing", 30, "Paper and one state page", [
    "Write the capital and the year.",
    "List the neighbors.",
    "Name one place and one Native nation.",
  ], "All five parts are there."),
  p("10-11", "solo", "Stars and stripes", 15, "Paper", [
    "Explain the 50 stars in your own words.",
    "Explain the 13 stripes.",
    "Keep the sentences short.",
  ], "Your note matches the flag."),
  p("10-11", "solo", "More than one state", 25, "A state page and a nation page", [
    "Pick a nation with homelands in more than one state.",
    "Name the states.",
    "Say the nation is not those states.",
  ], "You used a real example."),
  p("10-11", "solo", "A term line", 25, "One president page and paper", [
    "Draw a line of years.",
    "Mark the term or terms.",
    "If the person is still in office, write that.",
  ], "The dates match the page."),
  p("10-11", "solo", "Why the boxes", 15, "The states map", [
    "Look at Alaska and Hawaii.",
    "Write why they are in boxes.",
    "Say they are full states.",
  ], "Your note says they are not next to California."),
  p("10-11", "team", "One-page paper", 30, "Paper", [
    "Pick one state.",
    "Write three true facts.",
    "Do not invent a number.",
  ], "The page uses only facts from the site."),
  p("10-11", "team", "No ranking", 20, "Paper", [
    "Write why the quiz does not ask who the best president is.",
    "Write why it does not ask you to rank a people.",
  ], "Your note says people are not ranked."),
  p("10-11", "team", "Two regions, fair words", 30, "The culture map", [
    "Pick two regions.",
    "Write one way the lands are different.",
    "Do not say one people matters more.",
  ], "Both regions are described fairly."),
  p("10-11", "team", "Host a quick quiz", 25, "The quiz page", [
    "Play Quick 10 as two teams.",
    "Keep score.",
    "If you tie, play a playoff round.",
  ], "You finished with a winner or a draw."),

  p("11-12", "solo", "Careful numbers", 25, "Paper and the Cleveland page", [
    "Tell how the newest president number can be higher than the count of people.",
    "Use Cleveland as your example.",
    "Check Trump's two numbers too.",
  ], "Your explanation is careful."),
  p("11-12", "solo", "Three-state chart", 30, "Three state pages", [
    "Make a chart.",
    "Include capital, year, region, and one symbol.",
    "Add a title.",
  ], "The chart is complete."),
  p("11-12", "solo", "Two nations", 30, "Two nation pages", [
    "Write a short paragraph.",
    "Say they are different nations.",
    "Say people from both live there now.",
  ], "Both nations are named fairly."),
  p("11-12", "solo", "First, middle, now", 20, "The president list", [
    "Write about the first president.",
    "Write about one president from the middle years.",
    "Write about the president in office now, with years.",
  ], "The years are right."),
  p("11-12", "solo", "Label a region", 30, "The printable map", [
    "Pick one region, such as the West or the Southeast.",
    "Label those states.",
    "Check the map.",
  ], "The labels match the site."),
  p("11-12", "team", "Five president cards", 30, "Paper", [
    "Make five cards.",
    "Each card needs born, died or still living, and terms.",
    "Check every date.",
  ], "Five cards match the site."),
  p("11-12", "team", "Words for a younger child", 30, "Paper", [
    "Write a half page a seven-year-old can read.",
    "Explain why a Native nation is not a state.",
    "Use short sentences.",
  ], "The writing is short and clear."),
  p("11-12", "team", "Host the mega quiz", 30, "The quiz page", [
    "Host Mega 25.",
    "Use up to four teams.",
    "Keep score until there is a winner or a draw.",
  ], "The game reaches the end."),
  p("11-12", "team", "First and fiftieth", 25, "The state pages", [
    "Find the first state and its year.",
    "Find the 49th and the 50th.",
    "Tell the years in order.",
  ], "You named Delaware, Alaska, and Hawaii."),
];
