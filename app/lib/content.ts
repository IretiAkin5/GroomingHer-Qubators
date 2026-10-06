export const reviewNotice = "Sample lesson — awaiting professional review";
export const topics = [
  "All topics",
  "Body changes",
  "Periods",
  "Hygiene",
  "Boundaries",
  "Seeking help",
] as const;
export const lessons = [
  {
    slug: "body-changes",
    week: 1,
    topic: "Body changes",
    title: "Body changes: questions are welcome",
    summary: "A gentle introduction to growing up, at your own pace.",
    objective:
      "Recognise that growing up brings questions, and practise asking them without shame.",
    paragraphs: [
      "Puberty is the time when a child’s body begins to develop towards adulthood. People notice changes at different times. Learning about these changes can help you find words for your questions.",
      "You are welcome here whether or not your periods have started. You do not need to compare your body with a friend’s or share personal details in a lesson.",
    ],
    action:
      "In this fictional activity, Ada is unsure about something in her lesson. Choose a safe adult she could ask.",
    reflection:
      "Psalm 139:14 reminds us that we are wonderfully made. Changes in your body do not change your dignity. Learning and asking for help are ways of caring for yourself.",
    icon: "flower",
  },
  {
    slug: "getting-to-know-your-period",
    week: 2,
    topic: "Periods",
    title: "Getting to know your period",
    summary:
      "Understand the words, explore menstrual products and ask for help.",
    objective:
      "Understand the word “period” and practise asking a trusted adult for support.",
    paragraphs: [
      "A period is bleeding that happens as part of the menstrual cycle. Learning what the words mean and how menstrual products are used can make the topic easier to discuss.",
      "A trusted adult can help you learn about products and practical care. Questions are welcome before your first period too. This sample is a lesson preview, not advice about your own cycle.",
    ],
    action:
      "Fictional scenario: Ada wants to understand menstrual products. How could she start a conversation with a trusted adult?",
    reflection:
      "An original reflection on Psalm 139:14: your worth is constant. You can learn about your body with dignity and without shame.",
    icon: "book",
  },
  {
    slug: "hygiene-and-questions",
    week: 3,
    topic: "Hygiene",
    title: "Hygiene and questions about changes",
    summary: "Find respectful language for everyday care and questions.",
    objective:
      "Practise asking a general hygiene question without making assumptions about someone’s health.",
    paragraphs: [
      "Personal care is a topic you can learn about without embarrassment. A lesson can introduce vocabulary, while a qualified healthcare professional can help with questions about your own health.",
      "Discharge is a word used for fluid from the vagina. This introductory sample does not tell you whether a particular change is normal or identify a cause. Personal concerns deserve human support.",
    ],
    action:
      "Practise this fictional prompt: “Could you help me understand that word in the lesson?”",
    reflection:
      "Christian reflection: compassion begins with listening. Body changes and illness are not signs of impurity or spiritual failure.",
    icon: "leaf",
  },
  {
    slug: "asking-for-help",
    week: 4,
    topic: "Seeking help",
    title: "How to ask a trusted adult for help",
    summary: "Practise finding the words and choosing someone safe.",
    objective: "Identify a safe adult and a backup, using a fictional example.",
    paragraphs: [
      "You can ask for help without completing a diary or explaining everything in an app. Choose someone you feel safe with, such as a parent, guardian or the school’s verified support contact.",
      "If the first adult is unavailable or feels unsafe, choose another safe adult. For a personal health concern, a qualified healthcare professional can offer individual care.",
    ],
    action:
      "Fictional scenario: Ada says, “I have a question from our lesson. Could we talk privately?” Try a second wording she could choose.",
    reflection:
      "Christian reflection: courage can be a small first step. Prayer can accompany practical action; it does not replace needed healthcare.",
    icon: "heart",
  },
  {
    slug: "boundaries-and-trusted-adults",
    week: 5,
    topic: "Boundaries",
    title: "My boundaries, my trusted adults",
    summary: "Learn about respect, choices and safe support.",
    objective:
      "Practise respecting someone’s choice and finding a safe support route.",
    paragraphs: [
      "Personal boundaries help us talk about what feels respectful and safe. A learning activity should never require you to share a private experience.",
      "You may skip an activity, decline an optional diary, or ask a different safe adult for help. Assistance is not conditional on religious commitment.",
    ],
    action:
      "In a fictional activity, Ada does not want to share a diary. Practise a respectful response to her choice.",
    reflection:
      "Christian reflection: treating someone with dignity includes respecting boundaries and offering compassionate, practical support.",
    icon: "shield",
  },
  {
    slug: "reflect-and-grow",
    week: 6,
    topic: "Seeking help",
    title: "Look back, reflect and grow",
    summary: "Revisit your learning and think about your next step.",
    objective:
      "Recall one learning topic, a safe support contact and a backup.",
    paragraphs: [
      "Learning is not a race. You can revisit a topic, ask for an explanation, or use a printed lesson with a facilitator.",
      "The programme’s feedback focuses on understanding, confidence and access. It does not measure how often you keep a diary or rank you against other girls.",
    ],
    action:
      "Use the fictional school programme to identify one lesson and two support routes. No personal disclosure is needed.",
    reflection:
      "Christian reflection: growth includes patience and kindness towards yourself and others.",
    icon: "spark",
  },
] as const;
export type Lesson = (typeof lessons)[number];
export const faqs = [
  [
    "Who is the first programme for?",
    "Nigerian girls aged 13–15, including those who have not started their periods, supported by parents, guardians and participating schools.",
  ],
  [
    "Does a girl need her own phone?",
    "No. Guided school sessions and printed materials support core learning. Digital access is optional where available.",
  ],
  [
    "Is GroomingHer Christian?",
    "Yes. Bible reflections and Christian values are woven into the experience, while accurate health education remains central. Assistance is not conditional on religious commitment.",
  ],
  [
    "Can parents read the diary?",
    "Connecting accounts does not provide diary access. Girls choose the information they share in individual messages. Schools cannot browse diaries either.",
  ],
  [
    "Can AI diagnose a condition?",
    "No. Ask GroomingHer will explain approved lessons only. AI is unavailable in this demonstration while content and safety reviews are outstanding.",
  ],
  [
    "How can a school participate?",
    "Schools register interest, then discuss suitability and readiness. Interest does not approve a school or activate staff accounts. The form here is a fictional demonstration.",
  ],
  [
    "Is the pilot free?",
    "The planned first pilot is intended to be free for participating families. Funding and school arrangements must be confirmed before it begins.",
  ],
] as const;
export const programme = [
  "My changing body, dignity and how GroomingHer works",
  "Periods, products and the optional diary",
  "Hygiene, discharge and questions about changes",
  "Pain, daily activities and asking for help",
  "Boundaries, consent and trusted adults",
  "Review, anonymous questions and feedback",
];
export const roleNames = {
  girl: "Girl",
  parent: "Parent / Guardian",
  school: "School",
} as const;
export type Role = keyof typeof roleNames;
export function isRole(value: string): value is Role {
  return Object.hasOwn(roleNames, value);
}
