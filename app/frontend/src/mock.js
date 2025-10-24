// Mock data for personal portfolio

export const personalInfo = {
  welcomeMessage: {
    en: "Welcome to My Digital Space",
    ar: "أهلاً بكم في ملفي الشخصي"
  },
  name: {
    en: "Obada G. Hasan",
    ar: "عيادة غسان حسن"
  },
  title: {
    en: "IT Specialist - Level 3",
    ar: "أخصائي تكنولوجيا معلومات - المستوى الثالث"
  },
  bio: {
    en: "Obada Ghassan Hasan - An ambitious young professional from Jordan dedicated to empowering his community in the fields of Information Technology and Digital Education. Passionate about innovation and self-learning, guiding students toward a more conscious and creative technological future. Believes that technology is not merely a tool, but a means to build an aware generation capable of creating positive change.",
    ar: "شاب طموح من الأردن يسعى لتمكين مجتمعه في مجال تكنولوجيا المعلومات والتعليم الرقمي. يمتلك شغفًا بالابتكار والتعلّم الذاتي، ويعمل على توجيه الطلاب نحو مستقبل تقني أكثر وعيًا وإبداعًا. يؤمن بأن التكنولوجيا ليست مجرد أدوات، بل وسيلة لبناء جيل واعٍ قادر على صناعة التغيير الإيجابي."
  },
  description: {
    en: "Contributing to building a conscious and progressive educational community aligned with technological advancement in Jordan",
    ar: "مساهم في بناء مجتمع تعليمي واعٍ ومواكب للتطور التقني في الأردن"
  },
  photo: "/obada.jpeg",
  stats: [
    { label: { en: "Grade D", ar: "علامة D" }, value: 5 }, // No change requested
    { label: { en: "Grade M", ar: "علامة M" }, value: 3 },
    { label: { en: "Grade P", ar: "علامة P" }, value: 5 }
  ],
  socialLinks: {
    whatsapp: "https://chat.whatsapp.com/CnxwVXucXJl9JmAj28Umdg",
    youtube: "https://youtube.com/@noobada1?si=sFvrslYzfM2jwYo-"
  }
};

export const schools = [
  { id: 1, name: { en: "Beit Al-Maqdis School", ar: "مدرسة بيت المقدس" }, year: { en: "2008-2013", ar: "٢٠٠٨-٢٠١٣" }, grade: { en: "Kindergarten", ar: "الروضة" } },
  { id: 2, name: { en: "Al-Dahhiah Educational School", ar: "الضاحية التعليمية" }, year: { en: "2013-2014", ar: "٢٠١٣-٢٠١٤" }, grade: { en: "Grade 1", ar: "الصف الأول الابتدائي" } },
  { id: 3, name: { en: "Al-Moheet School", ar: "مدرسة المحيط" }, year: { en: "2014-2015", ar: "٢٠١٤-٢٠١٥" }, grade: { en: "Grade 2", ar: "الصف الثاني الابتدائي" } },
  { id: 4, name: { en: "Qartaj International School", ar: "مدرسة قرطاج الدولية" }, year: { en: "2015-2019", ar: "٢٠١٥-٢٠١٩" }, grade: { en: "Grades 3-6", ar: "الصفوف من الثالث للسادس" } },
  { id: 5, name: { en: "Al-Juwaid School", ar: "مدرسة الجويدة" }, year: { en: "2019-2021", ar: "٢٠١٩-٢٠٢١" }, grade: { en: "Grades 7-8", ar: "الصفوف السابع والثامن" } },
  { id: 6, name: { en: "Al-Baraa Bin Malik School", ar: "مدرسة البراء بن مالك" }, year: { en: "2021-2022", ar: "٢٠٢١-٢٠٢٢" }, grade: { en: "Grade 9", ar: "الصف التاسع" } },
  { id: 7, name: { en: "Um Al-Basateen School", ar: "مدرسة أم البساتين" }, year: { en: "2022-2023", ar: "٢٠٢٢-٢٠٢٣" }, grade: { en: "Grade 10", ar: "الصف العاشر" } },
  { id: 8, name: { en: "Marj Al-Hamam Vocational School", ar: "مدرسة مرج الحمام المهنية" }, year: { en: "2023-2026", ar: "٢٠٢٣-٢٠٢٦" }, grade: { en: "Grades 11-12", ar: "الثانوي والتوجيهي" } }
];

export const chatbotKnowledge = {
  topics: {
    en: [
      "Information Technology (IT) Education in Jordan",
      "BTEC Level 2 and Level 3 Programs",
      "Programming and Software Development",
      "Cybersecurity and Network Management",
      "Mobile App Development",
      "Web Development",
      "Artificial Intelligence Basics",
      "IT Project Management",
      "Career Opportunities in IT"
    ],
    ar: [
      "تعليم تكنولوجيا المعلومات في الأردن",
      "برامج BTEC المستوى الثاني والثالث",
      "البرمجة وتطوير البرمجيات",
      "الأمن السيبراني وإدارة الشبكات",
      "تطوير تطبيقات الهاتف المحمول",
      "تطوير المواقع الإلكترونية",
      "أساسيات الذكاء الاصطناعي",
      "إدارة مشاريع تكنولوجيا المعلومات",
      "فرص العمل في مجال تكنولوجيا المعلومات"
    ]
  },
  sampleResponses: {
    en: [
      "Hello! I can help you learn about Information Technology education in Jordan, specifically the BTEC framework for different age groups. What would you like to know?",
      "The BTEC Level 3 IT program covers advanced topics like programming, cybersecurity, mobile app development, and AI. It's designed for students in grades 11 and 12.",
      "Career opportunities include Software Developer, Network Administrator, Cybersecurity Analyst, Web Developer, and more!"
    ],
    ar: [
      "مرحباً! يمكنني مساعدتك في التعرف على تعليم تكنولوجيا المعلومات في الأردن، وخاصة إطار عمل BTEC للفئات العمرية المختلفة. ماذا تريد أن تعرف؟",
      "يغطي برنامج BTEC المستوى الثالث لتكنولوجيا المعلومات موضوعات متقدمة مثل البرمجة والأمن السيبراني وتطوير تطبيقات الهاتف المحمول والذكاء الاصطناعي. وهو مصمم لطلاب الصفين الحادي عشر والثاني عشر.",
      "تشمل الفرص الوظيفية مطور برمجيات، مدير شبكات، محلل أمن سيبراني، مطور ويب، والمزيد!"
    ]
  }
};

export const navigation = {
  en: [
    { id: "home", label: "Home" },
    { id: "chat", label: "AI Assistant" },
    { id: "about", label: "About" },
    { id: "education", label: "Education" },
    { id: "contact", label: "Connect" }
  ],
  ar: [
    { id: "home", label: "الرئيسية" },
    { id: "chat", label: "المساعد الذكي" },
    { id: "about", label: "نبذة عني" },
    { id: "education", label: "التعليم" },
    { id: "contact", label: "التواصل" }
  ]
};