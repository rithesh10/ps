export const ASSESSMENT_OPTIONS = [
  { label: "Did not apply to me at all", value: 0 },
  { label: "Applied to me to some degree, or some of the time", value: 1 },
  {
    label: "Applied to me to a considerable degree, or a good part of the time",
    value: 2,
  },
  { label: "Applied to me very much, or most of the time", value: 3 },
];

export const ASSESSMENT_SECTIONS = [
  {
    title: "Depression Subscale",
    questions: [
      { id: 1, text: "I found it hard to wind down." },
      { id: 2, text: "I was aware of dryness of my mouth." },
      {
        id: 3,
        text: "I couldn't seem to experience any positive feeling at all.",
      },
      {
        id: 4,
        text: "I experienced breathing difficulty (e.g., excessively rapid breathing, breathlessness in the absence of physical exertion).",
      },
      {
        id: 5,
        text: "I found it difficult to work up the initiative to do things.",
      },
      { id: 6, text: "I tended to over-react to situations." },
      {
        id: 7,
        text: "I had a feeling of shakiness (e.g., legs going to give way).",
      },
    ],
  },
  {
    title: "Anxiety Subscale",
    questions: [
      { id: 8, text: "I felt that I was using a lot of nervous energy." },
      {
        id: 9,
        text: "I was worried about situations in which I might panic and make a fool of myself.",
      },
      { id: 10, text: "I felt that I had nothing to look forward to." },
      {
        id: 11,
        text: "I was aware of the action of my heart in the absence of physical exertion (e.g., sense of heart rate increase, heart missing a beat).",
      },
      { id: 12, text: "I felt scared without any good reason." },
      { id: 13, text: "I felt that life was meaningless." },
      {
        id: 14,
        text: "I found it hard to focus on anything other than my breathing.",
      },
    ],
  },
  {
    title: "Stress Subscale",
    questions: [
      { id: 15, text: "I found it difficult to relax." },
      { id: 16, text: "I felt that I was rather touchy." },
      {
        id: 17,
        text: "I was intolerant of anything that kept me from getting on with what I was doing.",
      },
      { id: 18, text: "I felt that I was rather touchy." },
      { id: 19, text: "I was unable to become enthusiastic about anything." },
      { id: 20, text: "I felt I wasn't worth much as a person." },
      { id: 21, text: "I felt that I was not able to cope with things." },
    ],
  },
];
