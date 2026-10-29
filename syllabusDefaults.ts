import { AcademicDepartment, AcademicLevel, Subject } from '../types';

export function getCompulsorySubjects(userId: string, isHSC: boolean): Subject[] {
  const prefix = isHSC ? 'hsc' : 'ssc';
  return [
    {
      id: `subj_${prefix}_bn1`,
      userId,
      name: 'Bangla 1st Paper',
      nameBn: 'বাংলা ১ম পত্র',
      paper: '1st Paper',
      color: '#10B981',
      icon: 'BookOpen',
      chapters: isHSC
        ? [
            {
              id: 'ch_bn1_1',
              title: 'Prose (গদ্য)',
              titleBn: 'গদ্য (সাহিত্য পাঠ)',
              topics: [
                { id: 't_bn1_1_1', title: 'Oporichita (অপরিচিতা - রবীন্দ্রনাথ ঠাকুর)', titleBn: 'অপরিচিতা — রবীন্দ্রনাথ ঠাকুর', status: 'completed' },
                { id: 't_bn1_1_2', title: 'Bilasi (বিলাসী - শরৎচন্দ্র চট্টোপাধ্যায়)', titleBn: 'বিলাসী — শরৎচন্দ্র চট্টোপাধ্যায়', status: 'revised' },
                { id: 't_bn1_1_3', title: 'Amar Poth (আমার পথ - কাজী নজরুল ইসলাম)', titleBn: 'আমার পথ — কাজী নজরুল ইসলাম', status: 'reading' },
                { id: 't_bn1_1_4', title: 'Manob Kolyan (মানব-কল্যাণ - আবুল ফজল)', titleBn: 'মানব-কল্যাণ — আবুল ফজল', status: 'not_started' },
                { id: 't_bn1_1_5', title: 'Masi-Pisi (মাসি-পিসি - মানিক বন্দ্যোপাধ্যায়)', titleBn: 'মাসি-পিসি — মানিক বন্দ্যোপাধ্যায়', status: 'not_started' },
                { id: 't_bn1_1_6', title: 'Bayannor Dingulo (বায়ান্নর দিনগুলো - শেখ মুজিবুর রহমান)', titleBn: 'বায়ান্নর দিনগুলো', status: 'not_started' },
                { id: 't_bn1_1_7', title: 'Raincoat (রেইনকোট - আখতারুজ্জামান ইলিয়াস)', titleBn: 'রেইনকোট — আখতারুজ্জামান ইলিয়াস', status: 'not_started' },
              ],
            },
            {
              id: 'ch_bn1_2',
              title: 'Poetry (কবিতা)',
              titleBn: 'কবিতা (পদ্য)',
              topics: [
                { id: 't_bn1_2_1', title: 'Sonar Tori (সোনার তরী - রবীন্দ্রনাথ ঠাকুর)', titleBn: 'সোনার তরী — রবীন্দ্রনাথ ঠাকুর', status: 'completed' },
                { id: 't_bn1_2_2', title: 'Bidrohi (বিদ্রোহী - কাজী নজরুল ইসলাম)', titleBn: 'বিদ্রোহী — কাজী নজরুল ইসলাম', status: 'reading' },
                { id: 't_bn1_2_3', title: 'Protidan (প্রতিদান - জসীমউদ্‌দীন)', titleBn: 'প্রতিদান — জসীমউদ্‌দীন', status: 'not_started' },
                { id: 't_bn1_2_4', title: 'Taharei Pore Mone (তাহারেই পড়ে মনে - সুফিয়া কামাল)', titleBn: 'তাহারেই পড়ে মনে — সুফিয়া কামাল', status: 'not_started' },
                { id: 't_bn1_2_5', title: 'Atharo Bochor Boyos (আঠারো বছর বয়স - সুকান্ত ভট্টাচার্য)', titleBn: 'আঠারো বছর বয়স — সুকান্ত ভট্টাচার্য', status: 'not_started' },
                { id: 't_bn1_2_6', title: 'February 1969 (ফেব্রুয়ারি ১৯৬৯ - শামসুর রাহমান)', titleBn: 'ফেব্রুয়ারি ১৯৬৯ — শামসুর রাহমান', status: 'not_started' },
                { id: 't_bn1_2_7', title: 'Ami Kingbodontir Kotha Bolchi (আমি কিংবদন্তির কথা বলছি)', titleBn: 'আমি কিংবদন্তির কথা বলছি — আবু জাফর ওবায়দুল্লাহ', status: 'not_started' },
              ],
            },
            {
              id: 'ch_bn1_3',
              title: 'Novel & Drama (সহপাঠ)',
              titleBn: 'সহপাঠ (উপন্যাস ও নাটক)',
              topics: [
                { id: 't_bn1_3_1', title: 'Lalsalu Novel (লালসালু উপন্যাস - সৈয়দ ওয়ালীউল্লাহ)', titleBn: 'লালসালু (উপন্যাস) — চরিত্র ও মূলভাব বিশ্লেষণ', status: 'reading' },
                { id: 't_bn1_3_2', title: 'Sirajuddaula Drama (সিরাজউদ্দৌলা নাটক - সিকান্দার আবু জাফর)', titleBn: 'সিরাজউদ্দৌলা (নাটক) — সংলাপ ও ঐতিহাসিক পটভূমি', status: 'not_started' },
              ],
            },
          ]
        : [
            {
              id: 'ch_ssc_bn1_1',
              title: 'Prose (গদ্য)',
              titleBn: 'গদ্য (মাধ্যমিক সাহিত্য)',
              topics: [
                { id: 't_s_bn1_1', title: 'Shubha (সুভা - রবীন্দ্রনাথ ঠাকুর)', titleBn: 'সুভা — রবীন্দ্রনাথ ঠাকুর', status: 'completed' },
                { id: 't_s_bn1_2', title: 'Boi Pora (বই পড়া - প্রমথ চৌধুরী)', titleBn: 'বই পড়া — প্রমথ চৌধুরী', status: 'reading' },
                { id: 't_s_bn1_3', title: 'Am-Antir Bhepu (আম আঁটির ভেঁপু)', titleBn: 'আম আঁটির ভেঁপু — বিভূতিভূষণ বন্দ্যোপাধ্যায়', status: 'not_started' },
                { id: 't_s_bn1_4', title: 'Manush Muhammad (সা.) (মানুষ মুহম্মদ সা.)', titleBn: 'মানুষ মুহম্মদ (সা.) — মোহাম্মদ ওয়াজেদ আলী', status: 'not_started' },
                { id: 't_s_bn1_5', title: 'Shikha O Monushyotwo (শিক্ষা ও মনুষ্যত্ব)', titleBn: 'শিক্ষা ও মনুষ্যত্ব — মোতাহের হোসেন চৌধুরী', status: 'not_started' },
                { id: 't_s_bn1_6', title: 'Ekattorer Dinguli (একাত্তরের দিনগুলি)', titleBn: 'একাত্তরের দিনগুলি — জাহানারা ইমাম', status: 'not_started' },
              ],
            },
            {
              id: 'ch_ssc_bn1_2',
              title: 'Poetry (কবিতা)',
              titleBn: 'কবিতা (মাধ্যমিক পদ্য)',
              topics: [
                { id: 't_s_bn1_7', title: 'Bangabani (বঙ্গবাণী - আবদুল হাকিম)', titleBn: 'বঙ্গবাণী — আবদুল হাকিম', status: 'completed' },
                { id: 't_s_bn1_8', title: 'Kopotakkho Nod (কপোতাক্ষ নদ - মাইকেল মধুসূদন দত্ত)', titleBn: 'কপোতাক্ষ নদ — মাইকেল মধুসূদন দত্ত', status: 'revised' },
                { id: 't_s_bn1_9', title: 'Manush (মানুষ - কাজী নজরুল ইসলাম)', titleBn: 'মানুষ — কাজী নজরুল ইসলাম', status: 'not_started' },
                { id: 't_s_bn1_10', title: 'Polli Janani (পল্লিজননী - জসীমউদ্‌দীন)', titleBn: 'পল্লিজননী — জসীমউদ্‌দীন', status: 'not_started' },
                { id: 't_s_bn1_11', title: 'Tomake Paoar Jonno Hey Swadhinota', titleBn: 'তোমাকে পাওয়ার জন্যে, হে স্বাধীনতা', status: 'not_started' },
              ],
            },
            {
              id: 'ch_ssc_bn1_3',
              title: 'Novel & Drama (সহপাঠ)',
              titleBn: 'সহপাঠ (কাকতাড়ুয়া ও বহিপীর)',
              topics: [
                { id: 't_s_bn1_12', title: 'Kaktarua (কাকতাড়ুয়া উপন্যাস)', titleBn: 'কাকতাড়ুয়া (উপন্যাস) — সেলিনা হোসেন', status: 'not_started' },
                { id: 't_s_bn1_13', title: 'Bohipir (বহিপীর নাটক)', titleBn: 'বহিপীর (নাটক) — সৈয়দ ওয়ালীউল্লাহ', status: 'not_started' },
              ],
            },
          ],
    },
    {
      id: `subj_${prefix}_bn2`,
      userId,
      name: 'Bangla 2nd Paper',
      nameBn: 'বাংলা ২য় পত্র',
      paper: '2nd Paper',
      color: '#059669',
      icon: 'BookOpen',
      chapters: [
        {
          id: 'ch_bn2_1',
          title: 'Bangla Grammar (ব্যাকরণ অংশ)',
          titleBn: 'বাংলা ব্যাকরণ অংশ',
          topics: [
            { id: 't_bn2_1_1', title: 'Pronunciation Rules (বাংলা উচ্চারণের নিয়ম)', titleBn: 'বাংলা উচ্চারণের নিয়ম (অ, এ, ব-ফলা, ম-ফলা)', status: 'completed' },
            { id: 't_bn2_1_2', title: 'Bangla Spelling Rules (বাংলা বানানের নিয়ম)', titleBn: 'প্রমিত বাংলা বানানের নিয়ম (ণ-ত্ব ও ষ-ত্ব বিধান)', status: 'reading' },
            { id: 't_bn2_1_3', title: 'Grammatical Word Classes (ব্যাকরণিক শব্দশ্রেণি)', titleBn: 'ব্যাকরণিক শব্দশ্রেণি (বিশেষ্য, বিশেষণ, ক্রিয়া, আবেগ)', status: 'not_started' },
            { id: 't_bn2_1_4', title: 'Word Formation: Upasarga & Samasa (উপসর্গ ও সমাস)', titleBn: 'শব্দ গঠন: উপসর্গ, সমাস এবং প্রকৃতি-প্রত্যয়', status: 'not_started' },
            { id: 't_bn2_1_5', title: 'Syntax & Sentence Transformation (বাক্যতত্ত্ব ও বাক্য রূপান্তর)', titleBn: 'বাক্যতত্ত্ব (সরল, জটিল, যৌগিক বাক্য রূপান্তর)', status: 'not_started' },
            { id: 't_bn2_1_6', title: 'Correction of Errors (বাংলা ভাষার অপপ্রয়োগ ও শুদ্ধ প্রয়োগ)', titleBn: 'বাংলা ভাষার অপপ্রয়োগ ও শুদ্ধ প্রয়োগ', status: 'not_started' },
          ],
        },
        {
          id: 'ch_bn2_2',
          title: 'Composition & Writing (নির্মিতি অংশ)',
          titleBn: 'নির্মিতি ও রচনা অংশ',
          topics: [
            { id: 't_bn2_2_1', title: 'Terminology & Translation (পারিভাষিক শব্দ ও বঙ্গানুবাদ)', titleBn: 'পারিভাষিক শব্দ ও বঙ্গানুবাদ', status: 'revised' },
            { id: 't_bn2_2_2', title: 'Diary & Report Writing (দিনলিপি ও প্রতিবেদন রচনা)', titleBn: 'দিনলিপি লিখন ও প্রতিবেদন প্রণয়ন', status: 'not_started' },
            { id: 't_bn2_2_3', title: 'Email & Application Writing (বৈদ্যুতিন চিঠি ও আবেদনপত্র)', titleBn: 'বৈদ্যুতিন চিঠি (ইমেইল) ও দাপ্তরিক আবেদনপত্র', status: 'not_started' },
            { id: 't_bn2_2_4', title: 'Summary & Amplification (সারাংশ, সারমর্ম ও ভাবসম্প্রসারণ)', titleBn: 'সারাংশ, সারমর্ম ও ভাবসম্প্রসারণ', status: 'not_started' },
            { id: 't_bn2_2_5', title: 'Dialogue & Short Story (সংলাপ ও খুদে গল্প রচনা)', titleBn: 'সংলাপ রচনা ও খুদে গল্প লিখন', status: 'not_started' },
            { id: 't_bn2_2_6', title: 'Essay Writing (প্রবন্ধ রচনা)', titleBn: 'প্রবন্ধ-নিবন্ধ রচনা', status: 'not_started' },
          ],
        },
      ],
    },
    {
      id: `subj_${prefix}_eng1`,
      userId,
      name: 'English 1st Paper',
      nameBn: 'ইংরেজি ১ম পত্র (English 1st)',
      paper: '1st Paper',
      color: '#8B5CF6',
      icon: 'BookOpen',
      chapters: [
        {
          id: 'ch_eng1_1',
          title: 'Seen Comprehension & Textual Passages',
          titleBn: 'সিন প্যাসেজ ও টেক্সটবুক ইউনিটসমূহ',
          topics: [
            { id: 't_eng1_1_1', title: 'People or Institutions Making History (Mandela, Bangabandhu)', titleBn: 'ইতিহাস সৃষ্টিকারী ব্যক্তিত্ব (ম্যান্ডেলা, বঙ্গবন্ধু)', status: 'completed' },
            { id: 't_eng1_1_2', title: 'Dreams, Youth & Adolescence', titleBn: 'স্বপ্ন, তারুণ্য ও বয়ঃসন্ধিকাল (Adolescence)', status: 'reading' },
            { id: 't_eng1_1_3', title: 'Human Rights, Education & Life', titleBn: 'মানবাধিকার, শিক্ষা ও জীবনবোধ', status: 'not_started' },
            { id: 't_eng1_1_4', title: 'Environment, Climate Change & Kuakata/Hakaluki Haor', titleBn: 'পরিবেশ, জলবায়ু পরিবর্তন ও ঐতিহ্য', status: 'not_started' },
          ],
        },
        {
          id: 'ch_eng1_2',
          title: 'Vocabulary, Cloze Test & Rearranging',
          titleBn: 'ভোকাবুলারি, শূন্যস্থান পূরণ ও রি-অ্যারেঞ্জ',
          topics: [
            { id: 't_eng1_2_1', title: 'Cloze Test With Clues & Without Clues', titleBn: 'উইথ ক্লুজ ও উইদাউট ক্লুজ প্র্যাকটিস', status: 'reading' },
            { id: 't_eng1_2_2', title: 'Rearranging Sentences into Coherent Story', titleBn: 'রি-অ্যারেঞ্জিং সেন্টেন্সেস (Rearranging)', status: 'not_started' },
            { id: 't_eng1_2_3', title: 'Flow Chart & Summary Writing', titleBn: 'ফ্লো-চার্ট তৈরি ও সামারি রাইটিং', status: 'not_started' },
          ],
        },
        {
          id: 'ch_eng1_3',
          title: 'Guided Writing (1st Paper)',
          titleBn: 'রাইটিং পার্ট (গ্রাফ-চার্ট, স্টোরি ও লেটার)',
          topics: [
            { id: 't_eng1_3_1', title: 'Interpreting Graphs and Charts', titleBn: 'গ্রাফ ও পাই চার্ট বিশ্লেষণ', status: 'not_started' },
            { id: 't_eng1_3_2', title: 'Completing a Story & Appreciating Poems', titleBn: 'কমপ্লিটিং স্টোরি ও কবিতার মূলভাব', status: 'not_started' },
          ],
        },
      ],
    },
    {
      id: `subj_${prefix}_eng2`,
      userId,
      name: 'English 2nd Paper',
      nameBn: 'ইংরেজি ২য় পত্র (English 2nd)',
      paper: '2nd Paper',
      color: '#7C3AED',
      icon: 'BookOpen',
      chapters: [
        {
          id: 'ch_eng2_1',
          title: 'Grammar Items (Part A - 60 Marks)',
          titleBn: 'গ্রামার আইটেমসমূহ (৬০ নম্বর)',
          topics: [
            { id: 't_eng2_1_1', title: 'Articles & Appropriate Prepositions', titleBn: 'আর্টিকেল ও অ্যাপ্রোপ্রিয়েট প্রিপোজিশন', status: 'completed' },
            { id: 't_eng2_1_2', title: 'Special Uses of Words & Phrases (was born, had better, would rather)', titleBn: 'স্পেশাল ফ্রেজ ও ওয়ার্ডস', status: 'revised' },
            { id: 't_eng2_1_3', title: 'Completing Sentences with Clauses/Conditionals', titleBn: 'কমপ্লিটিং সেন্টেন্স ও কন্ডিশনালস', status: 'reading' },
            { id: 't_eng2_1_4', title: 'Right Form of Verbs & Subject-Verb Agreement', titleBn: 'রাইট ফর্ম অব ভার্বস', status: 'reading' },
            { id: 't_eng2_1_5', title: 'Narrative Style (Passage Narration)', titleBn: 'প্যাসেজ ন্যারেশন (Direct to Indirect)', status: 'not_started' },
            { id: 't_eng2_1_6', title: 'Pronoun Referencing & Modifiers (Pre/Post Modifiers)', titleBn: 'প্রোনাউন রেফারেন্স ও মডিফায়ার্স', status: 'not_started' },
            { id: 't_eng2_1_7', title: 'Sentence Connectors / Linking Words', titleBn: 'সেন্টেন্স কানেক্টর্স (Connectors)', status: 'not_started' },
            { id: 't_eng2_1_8', title: 'Synonyms, Antonyms & Punctuation', titleBn: 'সমার্থক-বিপরীত শব্দ ও বিরামচিহ্ন (Punctuation)', status: 'not_started' },
          ],
        },
        {
          id: 'ch_eng2_2',
          title: 'Composition & Formal Writing (Part B - 40 Marks)',
          titleBn: 'কম্পোজিশন ও রাইটিং (৪০ নম্বর)',
          topics: [
            { id: 't_eng2_2_1', title: 'Formal Application & Official Email Writing', titleBn: 'ফরমাল অ্যাপ্লিকেশন ও ইমেইল রাইটিং', status: 'not_started' },
            { id: 't_eng2_2_2', title: 'Report Writing for Newspapers', titleBn: 'সংবাদপত্রের জন্য রিপোর্ট রাইটিং', status: 'not_started' },
            { id: 't_eng2_2_3', title: 'Paragraphs (Listing, Cause & Effect, Comparison)', titleBn: 'প্যারাগ্রাফ রাইটিং', status: 'not_started' },
            { id: 't_eng2_2_4', title: 'Free Composition / Essay Writing', titleBn: 'কম্পোজিশন রাইটিং', status: 'not_started' },
          ],
        },
      ],
    },
    {
      id: `subj_${prefix}_ict`,
      userId,
      name: 'Information & Communication Technology (ICT)',
      nameBn: 'তথ্য ও যোগাযোগ প্রযুক্তি (ICT)',
      paper: 'General',
      color: '#EC4899',
      icon: 'Cpu',
      chapters: [
        {
          id: 'ch_ict_1',
          title: 'Ch 1: ICT: World & Bangladesh Perspective',
          titleBn: 'অধ্যায় ১: তথ্য ও যোগাযোগ প্রযুক্তি: বিশ্ব ও বাংলাদেশ প্রেক্ষিত',
          topics: [
            { id: 't_ict_1_1', title: 'Virtual Reality, AI & Robotics', titleBn: 'ভার্চুয়াল রিয়েলিটি, কৃত্রিম বুদ্ধিমত্তা ও রোবটিক্স', status: 'completed' },
            { id: 't_ict_1_2', title: 'Cryosurgery, Biometrics, Bioinformatics & Genetic Eng.', titleBn: 'ক্রায়োসার্জারি, বায়োমেট্রিক্স, জেনেটিক ইঞ্জিনিয়ারিং ও ন্যানোটেকনোলজি', status: 'revised' },
          ],
        },
        {
          id: 'ch_ict_2',
          title: 'Ch 2: Communication Systems & Networking',
          titleBn: 'অধ্যায় ২: কমিউনিকেশন সিস্টেমস ও নেটওয়ার্কিং',
          topics: [
            { id: 't_ict_2_1', title: 'Data Transmission Modes & Speed (Simplex, Duplex, Bandwidth)', titleBn: 'ডেটা ট্রান্সমিশন মোড ও মেথড (অ্যাসিনক্রোনাস, সিনক্রোনাস)', status: 'reading' },
            { id: 't_ict_2_2', title: 'Wired & Wireless Media (Fiber Optic, Wi-Fi, WiMAX, 4G/5G)', titleBn: 'অপটিক্যাল ফাইবার, রেডিও ওয়েভ, মাইক্রোওয়েভ ও স্যাটেলাইট', status: 'not_started' },
            { id: 't_ict_2_3', title: 'Network Topologies & Cloud Computing', titleBn: 'নেটওয়ার্ক টপোলজি (Star, Ring, Mesh) ও ক্লাউড কম্পিউটিং', status: 'not_started' },
          ],
        },
        {
          id: 'ch_ict_3',
          title: 'Ch 3: Number Systems & Digital Devices',
          titleBn: 'অধ্যায় ৩: সংখ্যা পদ্ধতি ও ডিজিটাল ডিভাইস',
          topics: [
            { id: 't_ict_3_1', title: 'Binary, Octal, Decimal & Hexadecimal Conversions', titleBn: 'বাইনারি, অক্টাল, দশমিক ও হেক্সাডেসিমাল সংখ্যা রূপান্তর', status: 'completed' },
            { id: 't_ict_3_2', title: "1's & 2's Complement Arithmetic", titleBn: 'চিহ্নযুক্ত সংখ্যা ও ২-এর পরিপূরক (2s Complement) যোগ-বিয়োগ', status: 'revised' },
            { id: 't_ict_3_3', title: "Boolean Algebra & De Morgan's Theorems", titleBn: 'বুলিয়ান অ্যালজেব্রা, সত্যক সারণি ও ডি-মরগানের উপপাদ্য', status: 'reading' },
            { id: 't_ict_3_4', title: 'Logic Gates (Universal Gates NAND, NOR & X-OR)', titleBn: 'মৌলিক ও সার্বজনীন লজিক গেট (NAND ও NOR দিয়ে বাস্তবায়ন)', status: 'not_started' },
            { id: 't_ict_3_5', title: 'Encoder, Decoder, Half/Full Adder & Flip-Flop Registers', titleBn: 'এনকোডার, ডিকোডার, হাফ ও ফুল অ্যাডার এবং কাউন্টার', status: 'not_started' },
          ],
        },
        {
          id: 'ch_ict_4',
          title: 'Ch 4: Introduction to Web Design & HTML',
          titleBn: 'অধ্যায় ৪: ওয়েব ডিজাইন পরিচিতি এবং HTML',
          topics: [
            { id: 't_ict_4_1', title: 'Website Structures (Tree, Linear, Hybrid) & IP/Domain', titleBn: 'ওয়েবসাইটের কাঠামো, আইপি অ্যাড্রেস ও ডোমেইন নেম', status: 'not_started' },
            { id: 't_ict_4_2', title: 'HTML Formatting Tags, Lists, Hyperlinks & Images', titleBn: 'HTML টেক্সট ফরম্যাটিং, লিস্ট, ইমেজ ও হাইপারলিংক ট্যাগ', status: 'not_started' },
            { id: 't_ict_4_3', title: 'HTML Tables (rowspan, colspan) & Web Publishing', titleBn: 'HTML টেবিল (rowspan, colspan) তৈরি ও ওয়েব হোস্টিং', status: 'not_started' },
          ],
        },
        {
          id: 'ch_ict_5',
          title: 'Ch 5: Programming Language (C Programming)',
          titleBn: 'অধ্যায় ৫: প্রোগ্রামিং ভাষা (C প্রোগ্রামিং)',
          topics: [
            { id: 't_ict_5_1', title: 'Algorithm, Flowchart & Translators (Compiler, Interpreter)', titleBn: 'অ্যালগরিদম, ফ্লোচার্ট ও অনুবাদক প্রোগ্রাম', status: 'not_started' },
            { id: 't_ict_5_2', title: 'C Data Types, Variables, Operators & Input/Output (scanf, printf)', titleBn: 'C ডেটা টাইপ, চলক, অপারেটর ও ইনপুট-আউটপুট ফাংশন', status: 'not_started' },
            { id: 't_ict_5_3', title: 'Conditional Statements (if-else, switch) & Loops (for, while, do-while)', titleBn: 'কন্ডিশনাল স্টেটমেন্ট (if-else) ও লুপ (for, while) দিয়ে ধারা যোগফল', status: 'not_started' },
            { id: 't_ict_5_4', title: 'Arrays & User-Defined Functions in C', titleBn: 'অ্যারে (Array) ও ফাংশন', status: 'not_started' },
          ],
        },
        {
          id: 'ch_ict_6',
          title: 'Ch 6: Database Management Systems (DBMS)',
          titleBn: 'অধ্যায় ৬: ডেটাবেজ ম্যানেজমেন্ট সিস্টেম (DBMS)',
          topics: [
            { id: 't_ict_6_1', title: 'RDBMS Concepts, Primary/Foreign Key & Relationships', titleBn: 'ডেটাবেজ মডেল, প্রাইমারি ও ফরেন কি এবং রিলেশনশিপ (1:1, 1:M, M:N)', status: 'not_started' },
            { id: 't_ict_6_2', title: 'SQL Queries (SELECT, INSERT, UPDATE, DELETE) & Sorting/Indexing', titleBn: 'SQL কুয়েরি ভাষা, সর্টিং, ইনডেক্সিং ও ডেটা সিকিউরিটি/এনক্রিপশন', status: 'not_started' },
          ],
        },
      ],
    },
  ];
}

export function getScienceSubjects(userId: string, isHSC: boolean): Subject[] {
  if (!isHSC) {
    // SSC Science (Class 9-10)
    return [
      {
        id: 'subj_ssc_math',
        userId,
        name: 'General Mathematics',
        nameBn: 'সাধারণ গণিত',
        paper: 'General',
        color: '#F59E0B',
        icon: 'Calculator',
        chapters: [
          {
            id: 'ch_s_math_1',
            title: 'Real Numbers, Sets & Functions',
            titleBn: 'বাস্তব সংখ্যা, সেট ও ফাংশন (অধ্যায় ১-২)',
            topics: [
              { id: 't_sm_1', title: 'Rational/Irrational Numbers & Recurring Decimals', titleBn: 'মূলদ ও অমূলদ সংখ্যা এবং আবৃত্ত দশমিক', status: 'completed' },
              { id: 't_sm_2', title: 'Power Sets, Cartesian Product, Domain & Range', titleBn: 'শক্তি সেট, কার্তেসীয় গুণজ, ডোমেন ও রেঞ্জ', status: 'revised' },
            ],
          },
          {
            id: 'ch_s_math_2',
            title: 'Algebraic Expressions, Exponents & Logarithms',
            titleBn: 'বীজগাণিতিক রাশি, সূচক ও লগারিদম (অধ্যায় ৩-৪)',
            topics: [
              { id: 't_sm_3', title: 'Cubic Formulas, Factorization & Remainder Theorem', titleBn: 'বর্গ ও ঘনের সূত্রাবলি এবং উৎপাদকে বিশ্লেষণ', status: 'reading' },
              { id: 't_sm_4', title: 'Laws of Indices & Logarithmic Equations', titleBn: 'সূচক ও লগারিদমের সমীকরণ সমাধান', status: 'not_started' },
            ],
          },
          {
            id: 'ch_s_math_3',
            title: 'Geometry: Triangles, Circles & Constructions',
            titleBn: 'জ্যামিতি: রেখা, ত্রিভুজ, বৃত্ত ও সম্পাদ্য (অধ্যায় ৬-৮)',
            topics: [
              { id: 't_sm_5', title: 'Circle Theorems (Chords, Arcs & Tangents)', titleBn: 'বৃত্ত সংক্রান্ত উপপাদ্য ও স্পর্শক', status: 'not_started' },
              { id: 't_sm_6', title: 'Circumcircle, Incircle & Excircle Constructions', titleBn: 'পরিবৃত্ত, অন্তর্বৃত্ত ও বহির্বৃত্ত অঙ্কন', status: 'not_started' },
            ],
          },
          {
            id: 'ch_s_math_4',
            title: 'Trigonometry & Mensuration',
            titleBn: 'ত্রিকোণমিতিক অনুপাত, দূরত্ব-উচ্চতা ও পরিমিতি (অধ্যায় ৯, ১০, ১৬)',
            topics: [
              { id: 't_sm_7', title: 'Trigonometric Identities & Heights/Distances', titleBn: 'ত্রিকোণমিতিক অভেদাবলি এবং দূরত্ব ও উচ্চতা', status: 'not_started' },
              { id: 't_sm_8', title: 'Mensuration of Triangles, Quadrilaterals, Cylinders & Cones', titleBn: 'ত্রিভুজ, চতুর্ভুজ, বেলন ও কোণকের ক্ষেত্রফল ও আয়তন', status: 'not_started' },
            ],
          },
          {
            id: 'ch_s_math_5',
            title: 'Finite Series & Statistics',
            titleBn: 'সসীম ধারা ও পরিসংখ্যান (অধ্যায় ১৩ ও ১৭)',
            topics: [
              { id: 't_sm_9', title: 'Arithmetic & Geometric Progression (AP & GP)', titleBn: 'সমান্তর ও গুণোত্তর ধারা', status: 'not_started' },
              { id: 't_sm_10', title: 'Short-cut Mean, Median, Mode & Ogive/Polygon', titleBn: 'সংক্ষিপ্ত পদ্ধতিতে গড়, মধ্যক, প্রচুরক ও অজিভ রেখা', status: 'not_started' },
            ],
          },
        ],
      },
      {
        id: 'subj_ssc_hmath',
        userId,
        name: 'Higher Mathematics (SSC)',
        nameBn: 'উচ্চতর গণিত (নবম-দশম)',
        paper: 'General',
        color: '#D97706',
        icon: 'Calculator',
        chapters: [
          {
            id: 'ch_s_hm_1',
            title: 'Sets, Algebraic Expressions & Equations',
            titleBn: 'সেট-ফাংশন, বীজগাণিতিক রাশি ও সমীকরণ',
            topics: [
              { id: 't_shm_1', title: 'One-to-One, Onto & Inverse Functions', titleBn: 'এক-এক ফাংশন, সার্বিক ফাংশন ও বিপরীত ফাংশন', status: 'reading' },
              { id: 't_shm_2', title: 'Partial Fractions & Cyclic Polynomials', titleBn: 'আংশিক ভগ্নাংশ ও চক্র-ক্রমিক রাশি', status: 'not_started' },
            ],
          },
          {
            id: 'ch_s_hm_2',
            title: 'Geometry, Vectors, Coordinate Geometry & Trigonometry',
            titleBn: 'জ্যামিতি, ভেক্টর, স্থানাঙ্ক জ্যামিতি ও ত্রিকোণমিতি',
            topics: [
              { id: 't_shm_3', title: "Apollonius' Theorem, Nine-Point Circle & Ptolemy's Theorem", titleBn: 'অ্যাপোলোনিয়াসের উপপাদ্য ও টলেমির উপপাদ্য', status: 'not_started' },
              { id: 't_shm_4', title: 'Radian Measure, Quadrant Rules & Trigonometric Graphs', titleBn: 'রেডিয়ান পরিমাপ ও ত্রিকোণমিতিক সমীকরণ', status: 'not_started' },
              { id: 't_shm_5', title: 'Coordinate Geometry: Area of Polygons & Straight Lines', titleBn: 'স্থানাঙ্ক জ্যামিতি: সরলরেখার ঢাল ও ক্ষেত্রফল', status: 'not_started' },
            ],
          },
          {
            id: 'ch_s_hm_3',
            title: 'Binomial Expansion, Solid Geometry & Probability',
            titleBn: 'দ্বিপদী বিস্তৃতি, ঘন জ্যামিতি ও সম্ভাবনা',
            topics: [
              { id: 't_shm_6', title: "Pascal's Triangle & Binomial Theorem", titleBn: 'প্যাসকেলের ত্রিভুজ ও দ্বিপদী বিস্তৃতি', status: 'not_started' },
              { id: 't_shm_7', title: 'Probability Tree & Sample Space', titleBn: 'সম্ভাবনা বৃক্ষ (Probability Tree) ও নমুনাক্ষেত্র', status: 'not_started' },
            ],
          },
        ],
      },
      {
        id: 'subj_ssc_phy',
        userId,
        name: 'Physics (SSC)',
        nameBn: 'পদার্থবিজ্ঞান (নবম-দশম)',
        paper: 'General',
        color: '#3B82F6',
        icon: 'Atom',
        chapters: [
          {
            id: 'ch_s_phy_1',
            title: 'Physical Quantities, Motion & Force',
            titleBn: 'ভৌত রাশি ও পরিমাপ, গতি এবং বল (অধ্যায় ১-৩)',
            topics: [
              { id: 't_sphy_1', title: 'Vernier Calipers, Screw Gauge & Equations of Motion', titleBn: 'ভারনিয়ার ক্যালিপার্স, স্ক্রু গজ ও গতির সমীকরণ', status: 'completed' },
              { id: 't_sphy_2', title: "Newton's Laws, Conservation of Momentum & Friction", titleBn: 'নিউটনের সূত্র, ভরবেগের সংরক্ষণ সূত্র ও ঘর্ষণ বল', status: 'reading' },
            ],
          },
          {
            id: 'ch_s_phy_2',
            title: 'Work, Power, Energy & States of Matter/Pressure',
            titleBn: 'কাজ, ক্ষমতা ও শক্তি এবং পদার্থের অবস্থা ও চাপ (অধ্যায় ৪-৫)',
            topics: [
              { id: 't_sphy_3', title: 'Kinetic & Potential Energy, Efficiency', titleBn: 'গতিশক্তি, বিভবশক্তি ও কর্মদক্ষতা', status: 'not_started' },
              { id: 't_sphy_4', title: "Pascal's Law, Archimedes' Principle & Buoyancy", titleBn: 'প্যাসকেলের সূত্র, আর্কিমিডিসের নীতি ও প্লবতা', status: 'not_started' },
            ],
          },
          {
            id: 'ch_s_phy_3',
            title: 'Heat, Waves & Sound, Light Reflection & Refraction',
            titleBn: 'বস্তুর ওপর তাপের প্রভাব, তরঙ্গ ও শব্দ এবং আলোর প্রতিফলন-প্রতিসরণ (অধ্যায় ৬-৯)',
            topics: [
              { id: 't_sphy_5', title: 'Thermal Expansion of Solids/Liquids & Calorimetry', titleBn: 'কঠিন ও তরলের প্রসারণ এবং ক্যালোরিমিতির মূলনীতি', status: 'not_started' },
              { id: 't_sphy_6', title: 'Velocity of Sound, Echo & Spherical Mirrors/Lenses', titleBn: 'শব্দের বেগ, প্রতিধ্বনি, গলীয় দর্পণ ও লেন্সের ক্ষমতা', status: 'not_started' },
            ],
          },
          {
            id: 'ch_s_phy_4',
            title: 'Static & Current Electricity, Magnetism',
            titleBn: 'স্থির বিদ্যুৎ, চল বিদ্যুৎ ও বিদ্যুতের চৌম্বক ক্রিয়া (অধ্যায় ১০-১২)',
            topics: [
              { id: 't_sphy_7', title: "Coulomb's Law, Ohm's Law, Series & Parallel Circuits", titleBn: 'কুলম্বের সূত্র, ওহমের সূত্র এবং শ্রেণি ও সমান্তরাল বর্তনী', status: 'not_started' },
              { id: 't_sphy_8', title: 'Transformer, Electric Power (BOT Unit) & Generator', titleBn: 'ট্রান্সফরমার ও বৈদ্যুতিক শক্তি (বিওটি ইউনিট) হিসাব', status: 'not_started' },
            ],
          },
        ],
      },
      {
        id: 'subj_ssc_chem',
        userId,
        name: 'Chemistry (SSC)',
        nameBn: 'রসায়ন (নবম-দশম)',
        paper: 'General',
        color: '#10B981',
        icon: 'FlaskConical',
        chapters: [
          {
            id: 'ch_s_chem_1',
            title: 'States of Matter, Structure of Matter & Periodic Table',
            titleBn: 'পদার্থের অবস্থা, পদার্থের গঠন ও পর্যায় সারণি (অধ্যায় ২-৪)',
            topics: [
              { id: 't_schem_1', title: 'Diffusion, Effusion, Heating & Cooling Curves', titleBn: 'ব্যাপন, নিঃসরণ এবং তাপ প্রয়োগের বক্ররেখা', status: 'completed' },
              { id: 't_schem_2', title: 'Rutherford & Bohr Models, Electronic Configuration & Periodic Trends', titleBn: 'রাদারফোর্ড ও বোর মডেল, ইলেকট্রন বিন্যাস ও পর্যাবৃত্ত ধর্ম', status: 'reading' },
            ],
          },
          {
            id: 'ch_s_chem_2',
            title: 'Chemical Bonds, Mole Concept & Chemical Reactions',
            titleBn: 'রাসায়নিক বন্ধন, মোলের ধারণা ও রাসায়নিক বিক্রিয়া (অধ্যায় ৫-৭)',
            topics: [
              { id: 't_schem_3', title: 'Ionic, Covalent & Metallic Bonds, Octet/Duet Rule', titleBn: 'আয়নিক, সমযোজী ও ধাতব বন্ধন', status: 'not_started' },
              { id: 't_schem_4', title: 'Molarity, Percentage Composition, Empirical/Molecular Formula & Limiting Reactant', titleBn: 'মোলারিটি, স্থূল ও আণবিক সংকেত এবং লিমিটিং বিক্রিয়ক', status: 'not_started' },
              { id: 't_schem_5', title: "Redox Reactions & Le Chatelier's Principle", titleBn: 'জারণ-বিজারণ বিক্রিয়া এবং লা-শাতেলিয়ারের নীতি', status: 'not_started' },
            ],
          },
          {
            id: 'ch_s_chem_3',
            title: 'Chemistry & Energy, Acid-Base Balance & Organic Chemistry',
            titleBn: 'রসায়ন ও শক্তি, এসিড-ক্ষারক সমতা এবং খনিজ সম্পদ: জীবাশ্ম/জৈব যৌগ (অধ্যায় ৮-১১)',
            topics: [
              { id: 't_schem_6', title: 'Electrolysis, Galvanic Cell & Bond Energy Calculations', titleBn: 'তড়িৎ বিশ্লেষণ, গ্যালভানিক কোষ ও বন্ধন শক্তি হিসাব', status: 'not_started' },
              { id: 't_schem_7', title: 'Hydrocarbons: Alkanes, Alkenes, Alkynes, Alcohols & Polymers', titleBn: 'হাইড্রোকার্বন (অ্যালকেন, অ্যালকিন, অ্যালকাইন, অ্যালকোহল ও পলিমার)', status: 'not_started' },
            ],
          },
        ],
      },
      {
        id: 'subj_ssc_bio',
        userId,
        name: 'Biology (SSC)',
        nameBn: 'জীববিজ্ঞান (নবম-দশম)',
        paper: 'General',
        color: '#14B8A6',
        icon: 'Dna',
        chapters: [
          {
            id: 'ch_s_bio_1',
            title: 'Cells & Tissues, Cell Division & Bioenergetics',
            titleBn: 'জীবকোষ ও টিস্যু, কোষ বিভাজন এবং জীবনীশক্তি (অধ্যায় ২-৪)',
            topics: [
              { id: 't_sbio_1', title: 'Plant & Animal Organelles, Meristematic & Permanent Tissues', titleBn: 'উদ্ভিদ ও প্রাণিকোষের অঙ্গাণু এবং ভাজক ও স্থায়ী টিস্যু', status: 'completed' },
              { id: 't_sbio_2', title: 'Mitosis, Meiosis, Photosynthesis (C3, C4) & Respiration (ATP Calculation)', titleBn: 'মাইটোসিস, সালোকসংশ্লেষণ (C3, C4 গতিপথ) ও শ্বসনে শক্তি উৎপাদন', status: 'reading' },
            ],
          },
          {
            id: 'ch_s_bio_2',
            title: 'Nutrition, Transport, Gas Exchange & Excretion',
            titleBn: 'খাদ্য ও পরিপাক, জীবে পরিবহন, গ্যাসীয় বিনিময় ও রেচন প্রক্রিয়া (অধ্যায় ৫-৮)',
            topics: [
              { id: 't_sbio_3', title: 'BMI, BMR, Human Digestive System & Enzymes', titleBn: 'বিএমআই, বিএমআর ও মানব পরিপাকতন্ত্র', status: 'not_started' },
              { id: 't_sbio_4', title: 'Blood Groups, Heart Structure, Lungs & Nephron Function', titleBn: 'রক্তের গ্রুপ, হৃৎপিণ্ডে রক্ত সঞ্চালন ও বৃক্কের নেফ্রনের গঠন', status: 'not_started' },
            ],
          },
          {
            id: 'ch_s_bio_3',
            title: 'Coordination, Reproduction, Genetics & Biotechnology',
            titleBn: 'সমন্বয়, প্রজনন, বংশগতি ও বিবর্তন এবং জীবপ্রযুক্তি (অধ্যায় ১০-১৪)',
            topics: [
              { id: 't_sbio_5', title: 'Pollination, Double Fertilization & Human Embryo Development', titleBn: 'পরাগায়ন, দ্বিনিষেক ও ভ্রূণের বিকাশ', status: 'not_started' },
              { id: 't_sbio_6', title: 'DNA Structure, Replication, Tissue Culture & Genetic Engineering', titleBn: 'ডিএনএ অনুলিপন, টিস্যু কালচার ও রিকম্বিনেন্ট ডিএনএ প্রযুক্তি', status: 'not_started' },
            ],
          },
        ],
      },
      {
        id: 'subj_ssc_bgs',
        userId,
        name: 'Bangladesh and Global Studies',
        nameBn: 'বাংলাদেশ ও বিশ্বপরিচয়',
        paper: 'General',
        color: '#6366F1',
        icon: 'Globe',
        chapters: [
          {
            id: 'ch_s_bgs_1',
            title: 'Language Movement, Liberation War & Independent Bangladesh',
            titleBn: 'পূর্ব বাংলার আন্দোলন ও জাতীয়তাবাদের উত্থান এবং স্বাধীন বাংলাদেশ (অধ্যায় ১-২)',
            topics: [
              { id: 't_sbgs_1', title: '1952 Language Movement, 6-Point Demand & 1971 Liberation War', titleBn: 'ভাষা আন্দোলন, ৬ দফা, ১৯৭০ নির্বাচন ও মহান মুক্তিযুদ্ধ', status: 'completed' },
            ],
          },
          {
            id: 'ch_s_bgs_2',
            title: 'Solar System, Geography, State & UN',
            titleBn: 'সৌরজগৎ, বাংলাদেশের ভূপ্রকৃতি, রাষ্ট্র, সংবিধান ও জাতিসংঘ',
            topics: [
              { id: 't_sbgs_2', title: 'Local Time & Longitude Calculations, Rivers & Climate of Bangladesh', titleBn: 'দ্রাঘিমা ও স্থানীয় সময় নির্ণয় এবং বাংলাদেশের নদ-নদী ও জলবায়ু', status: 'not_started' },
              { id: 't_sbgs_3', title: 'Organs of Government, National Income & SDGs', titleBn: 'সরকারের বিভাগসমূহ, জাতীয় আয় ও টেকসই উন্নয়ন লক্ষ্যমাত্রা (SDG)', status: 'not_started' },
            ],
          },
        ],
      },
    ];
  }

  // HSC Science Complete Syllabus (All 1st & 2nd Papers)
  return [
    {
      id: 'subj_hsc_phy1',
      userId,
      name: 'Physics 1st Paper',
      nameBn: 'পদার্থবিজ্ঞান ১ম পত্র',
      paper: '1st Paper',
      color: '#3B82F6',
      icon: 'Atom',
      chapters: [
        {
          id: 'ch_p1_1',
          title: 'Ch 1: Physical World and Measurement',
          titleBn: 'অধ্যায় ১: ভৌত জগৎ ও পরিমাপ',
          topics: [
            { id: 't_p1_1_1', title: 'Fundamental & Derived Units, Dimensional Equations', titleBn: 'মৌলিক ও লব্ধ রাশি এবং মাত্রা সমীকরণ', status: 'completed' },
            { id: 't_p1_1_2', title: 'Error Analysis (Relative & Percentage Error), Spherometer & Screw Gauge', titleBn: 'পরিমাপের ত্রুটি বিশ্লেষণ, স্ফেরোমিটার ও স্ক্রু-গজ', status: 'revised' },
          ],
        },
        {
          id: 'ch_p1_2',
          title: 'Ch 2: Vectors',
          titleBn: 'অধ্যায় ২: ভেক্টর',
          topics: [
            { id: 't_p1_2_1', title: 'Parallelogram Law of Vectors, River-Boat & Rain-Umbrella Problems', titleBn: 'ভেক্টর সামান্তরিক সূত্র, নদী-নৌকা ও বৃষ্টি-ছাতার গাণিতিক সমস্যা', status: 'reading' },
            { id: 't_p1_2_2', title: 'Scalar (Dot) & Vector (Cross) Products, Coplanarity', titleBn: 'স্কেলার (ডট) ও ভেক্টর (ক্রস) গুণন এবং সমতলীয় হওয়ার শর্ত', status: 'not_started' },
            { id: 't_p1_2_3', title: 'Vector Calculus: Gradient, Divergence (Solenoidal) & Curl (Irrotational)', titleBn: 'ভেক্টর ক্যালকুলাস: গ্র্যাডিয়েন্ট, ডাইভারজেন্স (সলিনয়ডাল) ও কার্ল (অঘূর্ণনশীল)', status: 'not_started' },
          ],
        },
        {
          id: 'ch_p1_3',
          title: 'Ch 4: Newtonian Mechanics',
          titleBn: 'অধ্যায় ৪: নিউটনীয় বলবিদ্যা',
          topics: [
            { id: 't_p1_3_1', title: 'Conservation of Linear & Angular Momentum, Elastic Collision', titleBn: 'রৈখিক ও কৌণিক ভরবেগের সংরক্ষণ সূত্র এবং স্থিতিস্থাপক সংঘর্ষ', status: 'not_started' },
            { id: 't_p1_3_2', title: 'Moment of Inertia, Radius of Gyration, Perpendicular & Parallel Axes Theorem', titleBn: 'জড়তার ভ্রামক, চক্রগতির ব্যাসার্ধ এবং লম্ব ও সমান্তরাল অক্ষ উপপাদ্য', status: 'not_started' },
            { id: 't_p1_3_3', title: 'Centripetal Force, Torque & Banking of Roads', titleBn: 'কেন্দ্রমুখী বল, টর্ক ও রাস্তার ব্যাংকিং কোণ নির্ণয়', status: 'not_started' },
          ],
        },
        {
          id: 'ch_p1_4',
          title: 'Ch 5: Work, Energy and Power',
          titleBn: 'অধ্যায় ৫: কাজ, শক্তি ও ক্ষমতা',
          topics: [
            { id: 't_p1_4_1', title: 'Work Done by Variable Force (Spring), Work-Energy Theorem', titleBn: 'পরিবর্তনশীল বল (স্প্রিং বল) দ্বারা কৃতকাজ ও কাজ-শক্তি উপপাদ্য', status: 'not_started' },
            { id: 't_p1_4_2', title: 'Conservation of Mechanical Energy (Simple Pendulum), Well/Tank Emptying Efficiency', titleBn: 'যান্ত্রিক শক্তির নিত্যতা এবং কুয়া বা চৌবাচ্চা পানি শূন্য করার কর্মদক্ষতা', status: 'not_started' },
          ],
        },
        {
          id: 'ch_p1_5',
          title: 'Ch 6: Gravitation and Gravity',
          titleBn: 'অধ্যায় ৬: মহাকর্ষ ও অভিকর্ষ',
          topics: [
            { id: 't_p1_5_1', title: "Kepler's Laws, Variation of g (Altitude, Depth, Latitude)", titleBn: 'কেপলারের সূত্র এবং উচ্চতা, গভীরতা ও অক্ষাংশভেদে g-এর পরিবর্তন', status: 'not_started' },
            { id: 't_p1_5_2', title: 'Gravitational Potential, Escape Velocity & Geostationary Satellites', titleBn: 'মহাকর্ষীয় বিভব, মুক্তিবেগ ও ভূ-স্থির উপগ্রহের বেগ ও পর্যায়কাল', status: 'not_started' },
          ],
        },
        {
          id: 'ch_p1_6',
          title: 'Ch 7: Structural Properties of Matter',
          titleBn: 'অধ্যায় ৭: পদার্থের গাঠনিক ধর্ম',
          topics: [
            { id: 't_p1_6_1', title: "Hooke's Law, Young's/Bulk/Rigidity Modulus, Elastic Potential Energy & Poisson's Ratio", titleBn: 'হুকের সূত্র, ইয়ং-এর গুণাঙ্ক, স্থিতিস্থাপক বিভব শক্তি ও পয়সনের অনুপাত', status: 'not_started' },
            { id: 't_p1_6_2', title: "Viscosity, Stokes' Law, Terminal Velocity & Surface Tension", titleBn: 'সান্দ্রতা, স্টোকসের সূত্র, প্রান্তিক বেগ ও পৃষ্ঠটান', status: 'not_started' },
          ],
        },
        {
          id: 'ch_p1_7',
          title: 'Ch 8: Periodic Motion',
          titleBn: 'অধ্যায় ৮: পর্যাবৃত্ত গতি',
          topics: [
            { id: 't_p1_7_1', title: 'Differential Equation of SHM, Velocity, Acceleration & Energy Graphs', titleBn: 'সরল ছন্দিত স্পন্দনের ব্যবকলনীয় সমীকরণ, বেগ, ত্বরণ ও শক্তির লেখচিত্র', status: 'not_started' },
            { id: 't_p1_7_2', title: 'Simple Pendulum, Second Pendulum & Determination of Mountain Height/Time Gain-Loss', titleBn: 'সরল দোলক, সেকেন্ড দোলক এবং পাহাড়ের উচ্চতা ও ঘড়ির সময় লাভ/ক্ষতি নির্ণয়', status: 'not_started' },
          ],
        },
        {
          id: 'ch_p1_8',
          title: 'Ch 9 & 10: Waves & Ideal Gas Kinetic Theory',
          titleBn: 'অধ্যায় ৯ ও ১০: তরঙ্গ এবং আদর্শ গ্যাস ও গ্যাসের গতিতত্ত্ব',
          topics: [
            { id: 't_p1_8_1', title: 'Progressive & Stationary Waves, Beats & Sound Intensity Level (dB)', titleBn: 'অগ্রগামী ও স্থির তরঙ্গের সমীকরণ, বীট (রৈখিক উপরিপাতন) ও তীব্রতা লেভেল', status: 'not_started' },
            { id: 't_p1_8_2', title: 'Ideal Gas Laws (Boyle, Charles), Lake Bubble Problem, RMS Velocity, Mean Free Path & Relative Humidity', titleBn: 'হ্রদের তলদেশ থেকে বুদবুদের আয়তন, গ্যাসের মূল গড় বর্গবেগ (Crms), গড় মুক্ত পথ ও আপেক্ষিক আর্দ্রতা (সিক্ত ও শুষ্ক বাল্ব হাইগ্রোমিটার)', status: 'not_started' },
          ],
        },
      ],
    },
    {
      id: 'subj_hsc_phy2',
      userId,
      name: 'Physics 2nd Paper',
      nameBn: 'পদার্থবিজ্ঞান ২য় পত্র',
      paper: '2nd Paper',
      color: '#2563EB',
      icon: 'Atom',
      chapters: [
        {
          id: 'ch_p2_1',
          title: 'Ch 1: Thermodynamics',
          titleBn: 'অধ্যায় ১: তাপগতিবিদ্যা',
          topics: [
            { id: 't_p2_1_1', title: 'Zeroth & First Law of Thermodynamics, Isothermal, Adiabatic, Isobaric & Isochoric Processes', titleBn: 'তাপগতিবিদ্যার প্রথম সূত্র এবং সমোষ্ণ ও রুদ্ধতাপীয় প্রক্রিয়ায় কৃতকাজ', status: 'reading' },
            { id: 't_p2_1_2', title: 'Second Law of Thermodynamics, Carnot Cycle, Heat Engine Efficiency & Entropy Calculation', titleBn: 'কার্নো চক্র, তাপ ইঞ্জিনের কর্মদক্ষতা ও এনট্রপির পরিবর্তন হিসাব', status: 'not_started' },
          ],
        },
        {
          id: 'ch_p2_2',
          title: 'Ch 2: Static Electricity',
          titleBn: 'অধ্যায় ২: স্থির তড়িৎ',
          topics: [
            { id: 't_p2_2_1', title: "Coulomb's Law, Electric Field Intensity, Electric Dipole & Gauss's Law", titleBn: 'কুলম্বের সূত্র, তড়িৎ প্রাবল্য, তড়িৎ দ্বিমেরু ও গাউসের সূত্র', status: 'not_started' },
            { id: 't_p2_2_2', title: 'Electric Potential, Parallel Plate Capacitor, Series/Parallel Combinations & Stored Energy', titleBn: 'তড়িৎ বিভব, সমান্তরাল পাত ধারক এবং ধারকের শ্রেণি-সমান্তরাল সমবায়ে সঞ্চিত শক্তি', status: 'not_started' },
          ],
        },
        {
          id: 'ch_p2_3',
          title: 'Ch 3: Current Electricity',
          titleBn: 'অধ্যায় ৩: চল তড়িৎ',
          topics: [
            { id: 't_p2_3_1', title: "Ohm's Law, Drift Velocity, Temperature Coefficient of Resistance & Joule's Heating Law", titleBn: 'তাড়ন বেগ, রোধের উষ্ণতা সহগ ও জুলের তাপীয় ক্রিয়া', status: 'not_started' },
            { id: 't_p2_3_2', title: "Kirchhoff's Laws (KCL, KVL), Wheatstone Bridge, Meter Bridge, Shunt & Ammeter Range Extension", titleBn: 'কার্শফের সূত্র, হুইটস্টোন ব্রিজ, শান্ট ও অ্যামিটারের পাল্লা বৃদ্ধি', status: 'not_started' },
          ],
        },
        {
          id: 'ch_p2_4',
          title: 'Ch 4 & 5: Magnetic Effects of Current & Electromagnetic Induction',
          titleBn: 'অধ্যায় ৪ ও ৫: তড়িৎ প্রবাহের চৌম্বক ক্রিয়া ও তাড়িতচৌম্বক আবেশ',
          topics: [
            { id: 't_p2_4_1', title: 'Biot-Savart Law, Lorentz Force, Hall Effect & Earth Magnetism', titleBn: 'বায়ো-সাভার্ট সূত্র, লরেঞ্জ বল ও হল ক্রিয়া (Hall Effect)', status: 'not_started' },
            { id: 't_p2_4_2', title: "Faraday's Law, Lenz's Law, Self/Mutual Inductance, Alternating Current (RMS) & Transformer", titleBn: 'ফ্যারাডের সূত্র, স্বকীয় ও পারস্পরিক আবেশ এবং দিক পরিবর্তী প্রবাহ (Irms)', status: 'not_started' },
          ],
        },
        {
          id: 'ch_p2_5',
          title: 'Ch 6 & 7: Geometrical Optics & Physical Optics',
          titleBn: 'অধ্যায় ৬ ও ৭: জ্যামিতিক ও ভৌত আলোকবিজ্ঞান',
          topics: [
            { id: 't_p2_5_1', title: "Refraction through Prism, Lens Maker's Formula, Compound Microscope & Telescope", titleBn: 'প্রিজমে আলোর প্রতিসরণ, লেন্স প্রস্তুতকারকের সূত্র ও জটিল অণুবীক্ষণ/দূরবীক্ষণ যন্ত্র', status: 'not_started' },
            { id: 't_p2_5_2', title: "Young's Double Slit Interference, Single Slit Diffraction, Grating & Polarization", titleBn: 'ইয়ং-এর দ্বি-চিড় পরীক্ষা (ব্যতিচার), অপবর্তন গ্রেটিং ও সমবর্তন', status: 'not_started' },
          ],
        },
        {
          id: 'ch_p2_6',
          title: 'Ch 8, 9 & 10: Modern Physics, Nuclear Physics & Semiconductors',
          titleBn: 'অধ্যায় ৮, ৯ ও ১০: আধুনিক পদার্থবিজ্ঞান, পরমাণু মডেল ও সেমিকন্ডাক্টর',
          topics: [
            { id: 't_p2_6_1', title: 'Length Contraction, Time Dilation, Mass-Energy Equivalence (E=mc²), Photoelectric Effect & Compton Effect', titleBn: 'কাল দীর্ঘায়ন, দৈর্ঘ্য সংকোচন, ভর বৃদ্ধি, আলোক তড়িৎ ক্রিয়া ও ডি ব্রগলি তরঙ্গদৈর্ঘ্য', status: 'not_started' },
            { id: 't_p2_6_2', title: 'Bohr Orbit Radius/Energy, Radioactive Decay Law, Half-Life, Mean Life & Mass Defect/Binding Energy', titleBn: 'বোর কক্ষপথের ব্যাসার্ধ ও শক্তি, তেজস্ক্রিয় ক্ষয় সূত্র, অর্ধায়ু, গড় আয়ু ও ভরত্রুটি', status: 'not_started' },
            { id: 't_p2_6_3', title: 'p-n Junction Diode, Rectifier, Transistor (α, β, Current/Voltage Gain) & Number Systems/Logic Gates', titleBn: 'p-n জাংশন ডায়োড, রেকটিফায়ার এবং ট্রানজিস্টরের প্রবাহ বিবর্ধন গুণক (α, β)', status: 'not_started' },
          ],
        },
      ],
    },
    {
      id: 'subj_hsc_chem1',
      userId,
      name: 'Chemistry 1st Paper',
      nameBn: 'রসায়ন ১ম পত্র',
      paper: '1st Paper',
      color: '#10B981',
      icon: 'FlaskConical',
      chapters: [
        {
          id: 'ch_c1_1',
          title: 'Ch 1: Safe Use of Laboratory',
          titleBn: 'অধ্যায় ১: ল্যাবরেটরির নিরাপদ ব্যবহার',
          topics: [
            { id: 't_c1_1_1', title: 'Glassware Cleaning, Paul Bunge & Digital Balance, Primary/Secondary Standard Substances & First Aid', titleBn: 'গ্লাস সামগ্রী পরিষ্কার, পল-বুঙ্গি ব্যালেন্স ও প্রাইমারি/সেকেন্ডারি প্রমাণ পদার্থ', status: 'completed' },
          ],
        },
        {
          id: 'ch_c1_2',
          title: 'Ch 2: Qualitative Chemistry',
          titleBn: 'অধ্যায় ২: গুণগত রসায়ন',
          topics: [
            { id: 't_c1_2_1', title: 'Rutherford & Bohr Models, Quantum Numbers (n, l, m, s), Pauli, Hund & Aufbau Principles', titleBn: 'বোর পরমাণু মডেল, কোয়ান্টাম সংখ্যা (n, l, m, s), আউফবাউ, হুন্ড ও পাউলির বর্জন নীতি', status: 'completed' },
            { id: 't_c1_2_2', title: 'Hydrogen Atomic Spectra (Lyman, Balmer, Paschen, Brackett, Pfund) & Rydberg Equation', titleBn: 'হাইড্রোজেন পরমাণুর রেখা বর্ণালী ও রিডবার্গ সমীকরণ', status: 'revised' },
            { id: 't_c1_2_3', title: 'Solubility, Solubility Product (Ksp), Ionic Product (Kip), Common Ion Effect & Confirmatory Ion Tests', titleBn: 'দ্রাব্যতা, দ্রাব্যতা গুণফল (Ksp), আয়নিক গুণফল (Kip), সম-আয়ন প্রভাব ও আয়ন শনাক্তকরণ', status: 'reading' },
            { id: 't_c1_2_4', title: 'Crystallization, Distillation, Solvent Extraction & Chromatography', titleBn: 'কেলাসন, পাতন, দ্রাবক নিষ্কাশন ও ক্রোমাটোগ্রাফি', status: 'not_started' },
          ],
        },
        {
          id: 'ch_c1_3',
          title: 'Ch 3: Periodic Properties & Chemical Bonding',
          titleBn: 'অধ্যায় ৩: মৌলের পর্যাবৃত্ত ধর্ম ও রাসায়নিক বন্ধন',
          topics: [
            { id: 't_c1_3_1', title: 's, p, d, f Block Elements, Transition Metals (Colored Compounds, Complex Ions, Catalysis)', titleBn: 's, p, d, f ব্লক মৌল এবং অবস্থান্তর মৌলের বৈশিষ্ট্য (রঙিন যৌগ ও জটিল আয়ন গঠন)', status: 'reading' },
            { id: 't_c1_3_2', title: 'Periodic Trends: Ionization Energy, Electron Affinity, Electronegativity & Atomic Radius', titleBn: 'আয়নীকরণ শক্তি, ইলেকট্রন আসক্তি ও তড়িৎ ঋণাত্মকতার ক্রম ও ব্যতিক্রম', status: 'not_started' },
            { id: 't_c1_3_3', title: 'Hybridization (sp, sp², sp³, sp³d, sp³d²), VSEPR Theory, Lone Pair Repulsion & Coordinate Bonds', titleBn: 'অরবিটাল সংকরায়ন (Hybridization), VSEPR তত্ত্ব ও মুক্তজোড় ইলেকট্রনের প্রভাব', status: 'not_started' },
            { id: 't_c1_3_4', title: "Polarization (Fajan's Rules), Van der Waals Forces & Hydrogen Bonding", titleBn: 'পোলারায়ন (ফাজানের নীতি) এবং হাইড্রোজেন বন্ধন', status: 'not_started' },
          ],
        },
        {
          id: 'ch_c1_4',
          title: 'Ch 4: Chemical Changes',
          titleBn: 'অধ্যায় ৪: রাসায়নিক পরিবর্তন',
          topics: [
            { id: 't_c1_4_1', title: "Green Chemistry, Rate of Reaction, Activation Energy, Arrhenius Equation & Le Chatelier's Principle", titleBn: 'গ্রিন কেমিস্ট্রি, বিক্রিয়ার হার, সক্রিয়ণ শক্তি ও লা-শাতেলিয়ারের নীতি', status: 'not_started' },
            { id: 't_c1_4_2', title: "Law of Mass Action, Equilibrium Constants (Kp & Kc Derivations and Math) & Ostwald's Dilution Law", titleBn: 'ভরক্রিয়ার সূত্র, সাম্যধ্রুবক Kp ও Kc-এর রাশিমালা প্রতিপাদন ও গাণিতিক সমস্যা', status: 'not_started' },
            { id: 't_c1_4_3', title: 'Ionic Product of Water (Kw), pH & pOH Calculations, Buffer Solutions (Henderson-Hasselbalch Equation) & Thermochemistry', titleBn: 'পানির আয়নিক গুণফল, pH ও বাফার দ্রবণের ক্রিয়াকৌশল (হেন্ডারসন-হ্যাসেলবাক সমীকরণ) এবং দহন/গঠন তাপ', status: 'not_started' },
          ],
        },
        {
          id: 'ch_c1_5',
          title: 'Ch 5: Vocational Chemistry',
          titleBn: 'অধ্যায় ৫: কর্মমুখী রসায়ন',
          topics: [
            { id: 't_c1_5_1', title: 'Food Security, Natural & Artificial Food Preservatives, Vinegar Preparation & Preservation Mechanism', titleBn: 'খাদ্য নিরাপত্তা, প্রাকৃতিক ও কৃত্রিম প্রিজারভেটিভস এবং মল্ট ভিনেগার প্রস্তুতি ও সংরক্ষণ কৌশল', status: 'not_started' },
            { id: 't_c1_5_2', title: 'Colloids, Suspensions, Milk Coagulation & Toiletries/Glass Cleaner Chemistry', titleBn: 'কলয়েড ও সাসপেনশন এবং গ্লাস ও টয়লেট ক্লিনারের পরিষ্কারক কৌশল', status: 'not_started' },
          ],
        },
      ],
    },
    {
      id: 'subj_hsc_chem2',
      userId,
      name: 'Chemistry 2nd Paper',
      nameBn: 'রসায়ন ২য় পত্র',
      paper: '2nd Paper',
      color: '#059669',
      icon: 'FlaskConical',
      chapters: [
        {
          id: 'ch_c2_1',
          title: 'Ch 1: Environmental Chemistry',
          titleBn: 'অধ্যায় ১: পরিবেশ রসায়ন',
          topics: [
            { id: 't_c2_1_1', title: "Gas Laws (Boyle, Charles, Avogadro, Dalton's Partial Pressure, Graham's Diffusion), Ideal vs Real Gases (Van der Waals Eq.)", titleBn: 'গ্যাস সূত্রাবলি (বয়েল, চার্লস, ডাল্টনের আংশিক চাপ, গ্রাহামের ব্যাপন সূত্র) এবং বাস্তব গ্যাস ও ভ্যানডার ওয়ালস সমীকরণ', status: 'reading' },
            { id: 't_c2_1_2', title: 'Acid-Base Theories (Arrhenius, Bronsted-Lowry Conjugate Acid-Base, Lewis Theory), Acid Rain & Water Purity (DO, BOD, COD, TDS)', titleBn: 'অম্ল-ক্ষার মতবাদ (ব্রনস্টেড-লাউরি অনুবন্ধী অম্ল-ক্ষারক ও লুইস মতবাদ), এসিড বৃষ্টি এবং পানির বিশুদ্ধতার মানদণ্ড (DO, BOD, COD)', status: 'not_started' },
          ],
        },
        {
          id: 'ch_c2_2',
          title: 'Ch 2: Organic Chemistry',
          titleBn: 'অধ্যায় ২: জৈব রসায়ন',
          topics: [
            { id: 't_c2_2_1', title: 'Homologous Series, IUPAC Nomenclature & Isomerism (Structural, Geometrical Cis-Trans & Optical Isomerism)', titleBn: 'সমগোত্রীয় শ্রেণি, ইউপ্যাক (IUPAC) নামকরণ এবং গাঠনিক, জ্যামিতিক (সিস-ট্রান্স) ও আলোক সমানুতা', status: 'not_started' },
            { id: 't_c2_2_2', title: 'Aromaticity (Huckel Rule), Electrophilic Substitution in Benzene (Nitration, Friedel-Crafts) & Ortho-Para/Meta Directing Groups', titleBn: 'অ্যারোমেটিসিটি (হাকেল নীতি), বেনজিনের ইলেকট্রনাকর্ষী প্রতিস্থাপন ও অর্থো-প্যারা/মেটা নির্দেশক মূলক', status: 'not_started' },
            { id: 't_c2_2_3', title: 'Alkanes, Alkenes (Markovnikov & Ozonolysis), Alkynes, SN1 vs SN2 Reactions & Elimination (Saytzeff Rule)', titleBn: 'মারকনিকভের নিয়ম, ওজোনীকরণ, SN1 ও SN2 বিক্রিয়ার কৌশল এবং অপসারণ বিক্রিয়া', status: 'not_started' },
            { id: 't_c2_2_4', title: 'Alcohols (Lucas Test), Aldehydes & Ketones (Aldol, Cannizzaro, Tollens & Fehling Tests), Carboxylic Acids, Amines & Diazonium Salts', titleBn: 'অ্যালকোহল (লুকাস বিকারক), অ্যালডিহাইড-কিটোন (অ্যালডল ঘনীভবন, ক্যানিজারো, টলেন ও ফেলিং পরীক্ষা), কার্বক্সিলিক এসিড ও অ্যামিন', status: 'not_started' },
          ],
        },
        {
          id: 'ch_c2_3',
          title: 'Ch 3: Quantitative Chemistry',
          titleBn: 'অধ্যায় ৩: পরিমাণগত রসায়ন',
          topics: [
            { id: 't_c2_3_1', title: 'Mole, Molarity, Molality, ppm/ppb conversions & Acid-Base Titration Indicators', titleBn: 'মোলারিটি, শতকরা ও পিপিএম (ppm) এককে রূপান্তর এবং অম্ল-ক্ষার টাইট্রেশন ও নির্দেশক', status: 'not_started' },
            { id: 't_c2_3_2', title: 'Redox Ion-Electron Half-Reaction Balancing & Iron Estimation using KMnO4 / K2Cr2O7, Iodometry & Iodimetry', titleBn: 'আয়ন-ইলেকট্রন পদ্ধতিতে জারণ-বিজারণ সমতাকরণ, KMnO4/K2Cr2O7 দ্বারা লোহার পরিমাণ নির্ণয় ও আয়োডোমিতি', status: 'not_started' },
            { id: 't_c2_3_3', title: 'Beer-Lambert Law & Atomic Absorption Spectroscopy', titleBn: 'বিয়ার-ল্যাম্বার্ট সূত্র ও বর্ণালীমিতিক বিশ্লেষণ', status: 'not_started' },
          ],
        },
        {
          id: 'ch_c2_4',
          title: 'Ch 4 & 5: Electrochemistry & Economic Chemistry',
          titleBn: 'অধ্যায় ৪ ও ৫: তড়িৎ রসায়ন এবং অর্থনৈতিক রসায়ন',
          topics: [
            { id: 't_c2_4_1', title: "Electrolytic Conductance, Faraday's Laws of Electrolysis & Electrochemical Series", titleBn: 'তড়িৎ বিশ্লেষ্য পরিবাহিতা, ফ্যারাডের তড়িৎ বিশ্লেষণ সূত্র ও তড়িৎ রাসায়নিক সারি', status: 'not_started' },
            { id: 't_c2_4_2', title: 'Electrode Potential, Cell EMF, Nernst Equation, Salt Bridge, Lead-Storage, Lithium-Ion & Fuel Cells', titleBn: 'কোষ বিভব (E°cell), নার্নস্ট সমীকরণ, লবণ সেতু, লেড স্টোরেজ ও লিথিয়াম আয়ন ব্যাটারি এবং ফুয়েল সেল', status: 'not_started' },
            { id: 't_c2_4_3', title: 'Natural Gas in Bangladesh, Urea, Glass, Ceramic, Pulp-Paper, Cement Manufacturing & Leather Tanning/Nanoparticles', titleBn: 'ইউরিয়া সার, কাচ, সিরামিক, কাগজ, সিমেন্ট উৎপাদন, চামড়া ট্যানিং ও ন্যানো পার্টিকেল', status: 'not_started' },
          ],
        },
      ],
    },
    {
      id: 'subj_hsc_hmath1',
      userId,
      name: 'Higher Mathematics 1st Paper',
      nameBn: 'উচ্চতর গণিত ১ম পত্র',
      paper: '1st Paper',
      color: '#F59E0B',
      icon: 'Calculator',
      chapters: [
        {
          id: 'ch_m1_1',
          title: 'Ch 1: Matrices and Determinants',
          titleBn: 'অধ্যায় ১: ম্যাট্রিক্স ও নির্ণায়ক',
          topics: [
            { id: 't_m1_1_1', title: 'Types of Matrices, Matrix Multiplication, Transpose & Symmetric/Skew-Symmetric Matrices', titleBn: 'ম্যাট্রিক্সের প্রকারভেদ, গুণন ও প্রতিসম/বিপ্রতিসম ম্যাট্রিক্স', status: 'completed' },
            { id: 't_m1_1_2', title: "Determinant Properties, Cofactors, Adjoint Matrix, Inverse Matrix (A⁻¹) & Cramer's Rule", titleBn: 'নির্ণায়কের ধর্মাবলি, সহগুণক, বিপরীত ম্যাট্রিক্স (A⁻¹) ও ক্রেমারের নিয়মে সমীকরণ জোট সমাধান', status: 'revised' },
          ],
        },
        {
          id: 'ch_m1_2',
          title: 'Ch 2 & 3: Vectors & Straight Lines',
          titleBn: 'অধ্যায় ২ ও ৩: ভেক্টর এবং সরলরেখা',
          topics: [
            { id: 't_m1_2_1', title: 'Cartesian & Polar Coordinates, Internal/External Division, Area of Triangle & Locus', titleBn: 'কার্তেসীয় ও পোলার স্থানাঙ্ক, অন্তর্বিভক্ত-বহির্বিভক্ত সূত্র, ত্রিভুজের ক্ষেত্রফল ও সঞ্চারপথ', status: 'reading' },
            { id: 't_m1_2_2', title: 'Slope, Various Equations of Straight Lines, Angle Between Two Lines, Parallel/Perpendicular Lines & Angle Bisectors', titleBn: 'সরলরেখার ঢাল ও বিভিন্ন সমীকরণ, মধ্যবর্তী কোণ, সমান্তরাল ও লম্ব রেখা এবং কোণের সমদ্বিখণ্ডক', status: 'not_started' },
          ],
        },
        {
          id: 'ch_m1_3',
          title: 'Ch 4: The Circle',
          titleBn: 'অধ্যায় ৪: বৃত্ত',
          topics: [
            { id: 't_m1_3_1', title: 'Standard & General Equation of Circle, Center, Radius & Intercepts on Axes', titleBn: 'বৃত্তের আদর্শ ও সাধারণ সমীকরণ, কেন্দ্র, ব্যাসার্ধ ও অক্ষদ্বয়ের খণ্ডিতাংশ', status: 'not_started' },
            { id: 't_m1_3_2', title: 'Tangents & Normals to a Circle, Chord of Contact & Radical Axis of Two Circles', titleBn: 'বৃত্তের স্পর্শক ও অভিলম্বের সমীকরণ এবং দুইটি বৃত্তের সাধারণ জ্যা', status: 'not_started' },
          ],
        },
        {
          id: 'ch_m1_4',
          title: 'Ch 5: Permutations and Combinations',
          titleBn: 'অধ্যায় ৫: বিন্যাস ও সমাবেশ',
          topics: [
            { id: 't_m1_4_1', title: 'Word Permutations, Circular Permutations & Combinations with Restrictions/Committee Formation', titleBn: 'শব্দের বর্ণের বিন্যাস, চক্রবিন্যাস এবং শর্তসাপেক্ষে দল বা কমিটি গঠন (সমাবেশ)', status: 'not_started' },
          ],
        },
        {
          id: 'ch_m1_5',
          title: 'Ch 6 & 7: Trigonometric Ratios & Associated Angles',
          titleBn: 'অধ্যায় ৬ ও ৭: ত্রিকোণমিতিক অনুপাত ও সংযুক্ত কোণের ত্রিকোণমিতিক অনুপাত',
          topics: [
            { id: 't_m1_5_1', title: 'Compound Angles (A±B), Transformation of Sums/Products, Multiple (2A, 3A) & Submultiple Angles', titleBn: 'যৌগিক কোণ (A±B), গুণফল ও যোগফলের রূপান্তর, গুণিতক কোণ (2A, 3A) ও উপগুণিতক কোণ', status: 'not_started' },
            { id: 't_m1_5_2', title: 'Properties of Triangles (Sine Rule, Cosine Rule, Area of Triangle)', titleBn: 'ত্রিভুজের গুণাবলি (সাইন সূত্র ও কোসাইন সূত্র)', status: 'not_started' },
          ],
        },
        {
          id: 'ch_m1_6',
          title: 'Ch 8 & 9: Functions & Differentiation (Calculus)',
          titleBn: 'অধ্যায় ৮ ও ৯: ফাংশন এবং অন্তরীকরণ (Differentiation)',
          topics: [
            { id: 't_m1_6_1', title: "Limits (Algebraic, Trigonometric, Exponential & L'Hospital's Rule) & Continuity", titleBn: 'লিমিট (বীজগাণিতিক, ত্রিকোণমিতিক ও লা-হসপিটাল রুল) এবং ফাংশনের অবিচ্ছিন্নতা', status: 'not_started' },
            { id: 't_m1_6_2', title: 'First Principle Derivatives, Chain Rule, Implicit, Parametric, Logarithmic & Successive Differentiation', titleBn: 'মূল নিয়মে অন্তরীকরণ, চেইন রুল, অব্যক্ত ও পরামিতিক ফাংশন এবং পর্যায়ক্রমিক অন্তরীকরণ', status: 'not_started' },
            { id: 't_m1_6_3', title: 'Tangents & Normals, Maxima and Minima (Optimization)', titleBn: 'স্পর্শক ও অভিলম্বের ঢাল এবং ফাংশনের গুরুমান ও লঘুমান নির্ণয়', status: 'not_started' },
          ],
        },
        {
          id: 'ch_m1_7',
          title: 'Ch 10: Integration (Calculus)',
          titleBn: 'অধ্যায় ১০: যোগজীকরণ (Integration)',
          topics: [
            { id: 't_m1_7_1', title: 'Indefinite Integrals, Method of Substitution, Partial Fractions & Integration by Parts (UV Rule)', titleBn: 'অনির্দিষ্ট যোগজ, প্রতিস্থাপন পদ্ধতি, আংশিক ভগ্নাংশ ও খণ্ডশ যোগজীকরণ (UV সূত্র)', status: 'not_started' },
            { id: 't_m1_7_2', title: 'Definite Integrals & Area Bounded by Curves (Circle, Parabola, Ellipse & Lines)', titleBn: 'নির্দিষ্ট যোগজ এবং বক্ররেখা দ্বারা আবদ্ধ ক্ষেত্রের ক্ষেত্রফল নির্ণয়', status: 'not_started' },
          ],
        },
      ],
    },
    {
      id: 'subj_hsc_hmath2',
      userId,
      name: 'Higher Mathematics 2nd Paper',
      nameBn: 'উচ্চতর গণিত ২য় পত্র',
      paper: '2nd Paper',
      color: '#D97706',
      icon: 'Calculator',
      chapters: [
        {
          id: 'ch_m2_1',
          title: 'Ch 1, 2 & 3: Real Numbers, Linear Programming & Complex Numbers',
          titleBn: 'অধ্যায় ১, ২ ও ৩: বাস্তব সংখ্যা, যোগাশ্রয়ী প্রোগ্রাম ও জটিল সংখ্যা',
          topics: [
            { id: 't_m2_1_1', title: 'Absolute Value Inequalities, Argand Diagram, Modulus & Argument of Complex Numbers', titleBn: 'পরমমান অসমতা, আর্গান্ড চিত্র এবং জটিল সংখ্যার মডুলাস ও আর্গুমেন্ট', status: 'reading' },
            { id: 't_m2_1_2', title: 'Square Root of Complex Numbers & Cube Roots of Unity (1, ω, ω²)', titleBn: 'জটিল সংখ্যার বর্গমূল এবং এককের ঘনমূল (ω-এর ধর্মাবলি)', status: 'not_started' },
          ],
        },
        {
          id: 'ch_m2_2',
          title: 'Ch 4 & 5: Polynomial Equations & Binomial Expansion',
          titleBn: 'অধ্যায় ৪ ও ৫: বহুপদী সমীকরণ ও দ্বিপদী বিস্তৃতি',
          topics: [
            { id: 't_m2_2_1', title: 'Nature of Roots (Discriminant), Relation Between Roots & Coefficients, Formation of Equations with Symmetric Roots', titleBn: 'দ্বিঘাত ও ত্রিঘাত সমীকরণের মূলের প্রকৃতি (নিশ্চায়ক) এবং মূল ও সহগের সম্পর্ক', status: 'not_started' },
            { id: 't_m2_2_2', title: 'Binomial Expansion for Positive & Negative/Fractional Indices, General & Middle Term, Coefficient of x^r', titleBn: 'দ্বিপদী বিস্তৃতির সাধারণ পদ, মধ্যপদ ও x-বর্জিত পদ নির্ণয়', status: 'not_started' },
          ],
        },
        {
          id: 'ch_m2_3',
          title: 'Ch 6: Conics (Parabola, Ellipse & Hyperbola)',
          titleBn: 'অধ্যায় ৬: কণিক (পরাবৃত্ত, উপবৃত্ত ও অধিবৃত্ত)',
          topics: [
            { id: 't_m2_3_1', title: 'Parabola: Vertex, Focus, Directrix, Latus Rectum & Focal Distance', titleBn: 'পরাবৃত্তের শীর্ষবিন্দু, উপকেন্দ্র, নিয়ামক রেখা ও উপকেন্দ্রিক লম্বের সমীকরণ', status: 'not_started' },
            { id: 't_m2_3_2', title: 'Ellipse & Hyperbola: Eccentricity, Major/Minor Axes, Foci, Directrices & Asymptotes', titleBn: 'উপবৃত্ত ও অধিবৃত্তের উৎকেন্দ্রিকতা, বৃহৎ ও ক্ষুদ্র অক্ষ, উপকেন্দ্র ও নিয়ামক নির্ণয়', status: 'not_started' },
          ],
        },
        {
          id: 'ch_m2_4',
          title: 'Ch 7: Inverse Trigonometric Functions & Trigonometric Equations',
          titleBn: 'অধ্যায় ৭: বিপরীত ত্রিকোণমিতিক ফাংশন ও ত্রিকোণমিতিক সমীকরণ',
          topics: [
            { id: 't_m2_4_1', title: 'Inverse Trigonometric Identities (sin⁻¹, cos⁻¹, tan⁻¹ Formulas) & General Solutions of Trigonometric Equations', titleBn: 'বিপরীত ত্রিকোণমিতিক অভেদাবলি প্রমাণ এবং ত্রিকোণমিতিক সমীকরণের সাধারণ সমাধান নির্ণয়', status: 'not_started' },
          ],
        },
        {
          id: 'ch_m2_5',
          title: 'Ch 8 & 9: Statics & Motion of Particles in a Plane (Dynamics)',
          titleBn: 'অধ্যায় ৮ ও ৯: স্থিতিবিদ্যা এবং সমতলে বস্তুকণার গতি (গতিবিদ্যা)',
          topics: [
            { id: 't_m2_5_1', title: "Parallelogram of Forces, Lami's Theorem, Parallel Forces & Equilibrium of Coplanar Forces", titleBn: 'বলের সামান্তরিক সূত্র, লামির উপপাদ্য এবং সদৃশ ও বিসদৃশ সমান্তরাল বলের লব্ধি', status: 'not_started' },
            { id: 't_m2_5_2', title: 'Relative Velocity, Equations of Motion Under Gravity & Projectile Motion (Max Height, Time of Flight, Range)', titleBn: 'আপেক্ষিক বেগ, অভিকর্ষের অধীনে পতনশীল বস্তু এবং প্রাসের গতি (সর্বোচ্চ উচ্চতা ও আনুভূমিক পাল্লা)', status: 'not_started' },
          ],
        },
        {
          id: 'ch_m2_6',
          title: 'Ch 10: Measures of Dispersion and Probability',
          titleBn: 'অধ্যায় ১০: বিস্তার পরিমাপ ও সম্ভাবনা',
          topics: [
            { id: 't_m2_6_1', title: 'Variance, Standard Deviation, Conditional Probability, Addition/Multiplication Laws & Bayes Theorem', titleBn: 'পরিমিত ব্যবধান, ভেদাঙ্ক এবং বর্জনশীল/অবর্জনশীল ও শর্তাধীন সম্ভাবনা', status: 'not_started' },
          ],
        },
      ],
    },
    {
      id: 'subj_hsc_bio1',
      userId,
      name: 'Biology 1st Paper (Botany)',
      nameBn: 'জীববিজ্ঞান ১ম পত্র (উদ্ভিদবিজ্ঞান)',
      paper: '1st Paper',
      color: '#14B8A6',
      icon: 'Dna',
      chapters: [
        {
          id: 'ch_b1_1',
          title: 'Ch 1 & 2: Cell Structure & Cell Division',
          titleBn: 'অধ্যায় ১ ও ২: কোষ ও এর গঠন এবং কোষ বিভাজন',
          topics: [
            { id: 't_b1_1_1', title: 'Cell Wall, Fluid Mosaic Model, Mitochondria, Plastids, Ribosomes & Chromosome Structure', titleBn: 'কোষপ্রাচীর, প্লাজমামেমব্রেন (ফ্লুইড মোজাইক মডেল), মাইটোকন্ড্রিয়া, ক্লোরোপ্লাস্ট ও ক্রোমোজোম', status: 'completed' },
            { id: 't_b1_1_2', title: 'DNA & RNA Structure, DNA Replication, Transcription, Translation & Genetic Code', titleBn: 'DNA ও RNA-এর গঠন, DNA রেপ্লিকেশন, ট্রান্সক্রিপশন ও ট্রান্সলেশন', status: 'revised' },
            { id: 't_b1_1_3', title: 'Cell Cycle, Mitosis Phases (Prophase to Telophase), Meiosis Prophase-I & Crossing Over', titleBn: 'মাইটোসিসের ধাপসমূহ এবং মিয়োসিস প্রোফেজ-১ ও ক্রসিং ওভারের গুরুত্ব', status: 'reading' },
          ],
        },
        {
          id: 'ch_b1_2',
          title: 'Ch 3 & 4: Cell Chemistry & Microorganisms',
          titleBn: 'অধ্যায় ৩ ও ৪: কোষ রসায়ন এবং অণুজীব',
          topics: [
            { id: 't_b1_2_1', title: 'Carbohydrates (Mono, Di, Polysaccharides), Amino Acids, Proteins, Lipids & Enzymes', titleBn: 'কার্বোহাইড্রেট, প্রোটিন, লিপিড ও এনজাইমের ক্রিয়াকৌশল', status: 'not_started' },
            { id: 't_b1_2_2', title: 'Viruses (T2 Bacteriophage Lytic/Lysogenic Cycle), Bacteria & Malaria Parasite (Plasmodium Life Cycle)', titleBn: 'ভাইরাস (T2 ফাজের লাইটিক ও লাইসোজেনিক চক্র), ব্যাকটেরিয়া ও ম্যালেরিয়া পরজীবীর জীবনচক্র', status: 'not_started' },
          ],
        },
        {
          id: 'ch_b1_3',
          title: 'Ch 5, 6 & 7: Algae/Fungi, Bryophyta/Pteridophyta & Gymnosperms/Angiosperms',
          titleBn: 'অধ্যায় ৫, ৬ ও ৭: শৈবাল-ছত্রাক, ব্রায়োফাইটা-টেরিডোফাইটা এবং নগ্নবীজী ও আবৃতবীজী উদ্ভিদ',
          topics: [
            { id: 't_b1_3_1', title: 'Ulothrix, Agaricus, Riccia, Pteris, Cycas & Poaceae/Malvaceae Family Characteristics', titleBn: 'Ulothrix, Agaricus, Pteris, Cycas এবং Poaceae ও Malvaceae গোত্রের শনাক্তকারী বৈশিষ্ট্য ও পুষ্পপ্রতীক', status: 'not_started' },
          ],
        },
        {
          id: 'ch_b1_4',
          title: 'Ch 8 & 9: Tissue Systems & Plant Physiology',
          titleBn: 'অধ্যায় ৮ ও ৯: টিস্যু ও টিস্যুতন্ত্র এবং উদ্ভিদ শারীরতত্ত্ব',
          topics: [
            { id: 't_b1_4_1', title: 'Meristematic Tissues, Epidermal, Ground & Vascular Bundles, Monocot Root vs Stem Anatomy', titleBn: 'ভাজক টিস্যু, ভাস্কুলার বান্ডলের প্রকারভেদ এবং একবীজপত্রী মূল ও কাণ্ডের অন্তর্গঠন', status: 'not_started' },
            { id: 't_b1_4_2', title: 'Mineral Salt Absorption, Stomatal Opening/Closing, Photosynthesis (Light/Dark Phases, C3 vs C4) & Respiration (Glycolysis, Krebs Cycle)', titleBn: 'খনিজ লবণ পরিশোষণ, পত্ররন্ধ্র খোলা-বন্ধ হওয়া, সালোকসংশ্লেষণ (C3 ও C4 চক্র) এবং শ্বসন (গ্লাইকোলাইসিস ও ক্রেবস চক্র)', status: 'not_started' },
          ],
        },
        {
          id: 'ch_b1_5',
          title: 'Ch 10, 11 & 12: Plant Reproduction, Biotechnology & Ecology',
          titleBn: 'অধ্যায় ১০, ১১ ও ১২: উদ্ভিদ প্রজনন, জীবপ্রযুক্তি ও জীবের পরিবেশ',
          topics: [
            { id: 't_b1_5_1', title: 'Gametophyte Development, Double Fertilization, Tissue Culture & Recombinant DNA Technology (Plasmid, Insulin Production)', titleBn: 'পুং ও স্ত্রী গ্যামেটোফাইটের বিকাশ, দ্বিনিষেক, টিস্যু কালচার ও রিকম্বিনেন্ট DNA প্রযুক্তি (ইনসুলিন উৎপাদন)', status: 'not_started' },
            { id: 't_b1_5_2', title: 'Biogeographical Regions, Biodiversity Conservation (In-situ vs Ex-situ) & Mangrove Forest Adaptations', titleBn: 'ম্যানগ্রোভ বনের অভিযোজন এবং জীববৈচিত্র্য সংরক্ষণ (In-situ ও Ex-situ)', status: 'not_started' },
          ],
        },
      ],
    },
    {
      id: 'subj_hsc_bio2',
      userId,
      name: 'Biology 2nd Paper (Zoology)',
      nameBn: 'জীববিজ্ঞান ২য় পত্র (প্রাণিবিজ্ঞান)',
      paper: '2nd Paper',
      color: '#0D9488',
      icon: 'Dna',
      chapters: [
        {
          id: 'ch_b2_1',
          title: 'Ch 1 & 2: Animal Diversity & Introduction to Animals (Hydra, Grasshopper, Rohu Fish)',
          titleBn: 'অধ্যায় ১ ও ২: প্রাণীর বিভিন্নতা ও শ্রেণিবিন্যাস এবং প্রাণীর পরিচিতি',
          topics: [
            { id: 't_b2_1_1', title: 'Symmetry, Coelom, Non-Chordate Major Phyla (Porifera to Echinodermata) & Chordata Classes', titleBn: 'প্রতিসাম্যতা, সিলোম এবং নন-কর্ডাটা পর্বসমূহ ও কর্ডাটার শ্রেণিবিন্যাস', status: 'completed' },
            { id: 't_b2_1_2', title: 'Hydra (Cnidocyte, Nematocyst, Locomotion, Symbiosis), Grasshopper (Mouthparts, Compound Eye/Ommatidium, Vision, Metamorphosis) & Labeo rohita (Heart, Blood Circulation, Air Bladder)', titleBn: 'হাইড্রা (নিডোসাইট ও চলন), ঘাসফড়িং (মুখোপাঙ্গ, ওমাটিডিয়াম ও দর্শন কৌশল) এবং রুই মাছ (রক্ত সংবহন ও বায়ুথলি)', status: 'reading' },
          ],
        },
        {
          id: 'ch_b2_2',
          title: 'Ch 3 & 4: Human Physiology: Digestion & Blood Circulation',
          titleBn: 'অধ্যায় ৩ ও ৪: পরিপাক ও শোষণ এবং রক্ত ও সঞ্চালন',
          topics: [
            { id: 't_b2_2_1', title: 'Digestion in Stomach & Small Intestine, Role of Liver & Pancreas, BMI & Obesity', titleBn: 'পাকস্থলী ও ক্ষুদ্রান্ত্রে পরিপাক এবং পরিপাকে যকৃত ও অগ্ন্যাশয়ের ভূমিকা', status: 'not_started' },
            { id: 't_b2_2_2', title: 'Blood Corpuscles, Blood Clotting Mechanism, Structure of Human Heart, Cardiac Cycle, Junctional Tissue (Pacemaker) & Heart Diseases', titleBn: 'রক্ত তঞ্চন কৌশল, হৃৎপিণ্ডের গঠন, কার্ডিয়াক চক্র, পেসমেকার (SAN/AVN) এবং এনজাইনা ও হার্ট অ্যাটাক', status: 'not_started' },
          ],
        },
        {
          id: 'ch_b2_3',
          title: 'Ch 5, 6 & 7: Respiration, Excretion & Locomotion',
          titleBn: 'অধ্যায় ৫, ৬ ও ৭: শ্বসন ও শ্বাসক্রিয়া, বর্জ্য ও নিষ্কাশন এবং চলন ও অঙ্গচালনা',
          topics: [
            { id: 't_b2_3_1', title: 'Alveolus Structure, O2 & CO2 Transport in Blood, Otitis Media & Sinusitis', titleBn: 'অ্যালভিওলাসের গঠন, রক্তে অক্সিজেন ও কার্বন ডাই-অক্সাইড পরিবহন এবং সাইনুসাইটিস/ওটিটিস মিডিয়া', status: 'not_started' },
            { id: 't_b2_3_2', title: 'Kidney & Nephron Structure, Urine Formation, Osmoregulation & Dialysis', titleBn: 'নেফ্রনের গঠন, মূত্র সৃষ্টি প্রক্রিয়া ও অসমোরেগুলেশন', status: 'not_started' },
            { id: 't_b2_3_3', title: 'Human Skeleton (Axial & Appendicular Bones), Typical Vertebra, Synovial Joints, Bone Fractures & Muscle Contraction', titleBn: 'মানব কঙ্কালতন্ত্র, আদর্শ কশেরুকার গঠন এবং অস্থিসন্ধি ও অস্থিভঙ্গ', status: 'not_started' },
          ],
        },
        {
          id: 'ch_b2_4',
          title: 'Ch 8, 9 & 10: Coordination, Reproduction & Immunity',
          titleBn: 'অধ্যায় ৮, ৯ ও ১০: সমন্বয় ও নিয়ন্ত্রণ, মানব জীবনের ধারাবাহিকতা ও প্রতিরক্ষা',
          topics: [
            { id: 't_b2_4_1', title: 'Human Brain, Cranial Nerves, Structure of Eye & Ear, Endocrine Glands & Hormones', titleBn: 'মানব মস্তিষ্ক, করোটিক স্নায়ু, চোখ ও কানের গঠন এবং অন্তঃক্ষরা গ্রন্থি ও হরমোন', status: 'not_started' },
            { id: 't_b2_4_2', title: 'Lines of Defense (1st, 2nd, 3rd), Macrophage & Neutrophil Phagocytosis, Antibodies (IgG, IgM, IgA) & Vaccination', titleBn: 'প্রতিরক্ষা স্তর, ফ্যাগোসাইটোসিস, অ্যান্টিবডির গঠন ও টিকা (Vaccination)', status: 'not_started' },
          ],
        },
        {
          id: 'ch_b2_5',
          title: 'Ch 11 & 12: Genetics, Evolution & Animal Behavior',
          titleBn: 'অধ্যায় ১১ ও ১২: জিনতত্ত্ব ও বিবর্তন এবং প্রাণীর আচরণ',
          topics: [
            { id: 't_b2_5_1', title: "Mendel's 1st & 2nd Laws, Exceptions (Incomplete Dominance, Co-dominance, Lethal Genes, Epistasis, Polygenic Inheritance)", titleBn: 'মেন্ডেলের ১ম ও ২য় সূত্র এবং ব্যতিক্রম (অসম্পূর্ণ প্রকটতা, সমপ্রকটতা, লিথাল জিন ও এপিস্ট্যাসিস)', status: 'not_started' },
            { id: 't_b2_5_2', title: 'Sex-Linked Disorders (Color Blindness, Hemophilia), ABO & Rh Factor Erythroblastosis Fetalis & Theories of Evolution (Lamarck vs Darwin)', titleBn: 'সেক্স-লিংকড ডিসঅর্ডার (বর্ণান্ধতা, হিমোফিলিয়া), Rh ফ্যাক্টর জটিলতা এবং ল্যামার্ক ও ডারউইনের মতবাদ', status: 'not_started' },
          ],
        },
      ],
    },
  ];
}

export function getHumanitiesSubjects(userId: string, isHSC: boolean): Subject[] {
  if (!isHSC) {
    // SSC Humanities (Class 9-10)
    return [
      {
        id: 'subj_ssc_hist',
        userId,
        name: 'History of Bangladesh and World Civilization',
        nameBn: 'বাংলাদেশের ইতিহাস ও বিশ্বসভ্যতা',
        paper: 'General',
        color: '#F59E0B',
        icon: 'BookOpen',
        chapters: [
          {
            id: 'ch_shist_1',
            title: 'Introduction to History & World Civilizations (Egyptian, Indus, Greek, Roman)',
            titleBn: 'ইতিহাস পরিচিতি ও বিশ্বসভ্যতা (মিসর, সিন্ধু, গ্রিক ও রোমান)',
            topics: [
              { id: 't_shist_1', title: 'Sources of History & Contributions of Ancient Civilizations', titleBn: 'ইতিহাসের উপাদান ও প্রাচীন সভ্যতাসমূহের অবদান', status: 'completed' },
            ],
          },
          {
            id: 'ch_shist_2',
            title: 'Ancient Janapadas, Maurya, Gupta, Pala, Sena & Medieval Bengal',
            titleBn: 'প্রাচীন বাংলার জনপদ (পুণ্ড্র, বঙ্গ, সমতট, হরিকেল), মৌর্য-গুপ্ত-পাল-সেন ও মধ্যযুগের বাংলা',
            topics: [
              { id: 't_shist_2', title: 'Janapadas, Gopala, Dharmapala, Ilyas Shahi & Husain Shahi Dynasties', titleBn: 'প্রাচীন জনপদ, পাল ও সেন শাসন এবং স্বাধীন সুলতানি আমল', status: 'reading' },
            ],
          },
          {
            id: 'ch_shist_3',
            title: 'British Rule, Partition of Bengal, Language Movement & 1971 Liberation War',
            titleBn: 'ইংরেজ শাসনামল, ভাষা আন্দোলন ও ১৯৭১-এর মহান মুক্তিযুদ্ধ',
            topics: [
              { id: 't_shist_3', title: 'Battle of Plassey (1757), Permanent Settlement (1793), Sepoy Mutiny (1857) & Independence of Bangladesh', titleBn: 'পলাশী যুদ্ধ, চিরস্থায়ী বন্দোবস্ত, সিপাহি বিদ্রোহ, ভাষা আন্দোলন ও মুক্তিযুদ্ধ', status: 'not_started' },
            ],
          },
        ],
      },
      {
        id: 'subj_ssc_geo',
        userId,
        name: 'Geography and Environment',
        nameBn: 'ভূগোল ও পরিবেশ',
        paper: 'General',
        color: '#10B981',
        icon: 'Globe',
        chapters: [
          {
            id: 'ch_sgeo_1',
            title: 'Universe, Earth Interior, Landforms, Atmosphere & Hydrosphere',
            titleBn: 'মহাবিশ্ব ও আমাদের পৃথিবী, পৃথিবীর অভ্যন্তরীণ ও বাহ্যিক গঠন, বায়ুমণ্ডল ও বারিমণ্ডল',
            topics: [
              { id: 't_sgeo_1', title: 'Rocks & Minerals, Earthquakes, Volcanoes, River Landforms & Ocean Currents/Tides', titleBn: 'শিলা ও খনিজ, ভূমিকম্প, আগ্নেয়গিরি, নদীর কার্য ও জোয়ার-ভাটা', status: 'completed' },
            ],
          },
          {
            id: 'ch_sgeo_2',
            title: 'Population, Settlement, Resources, Industries & Geography of Bangladesh',
            titleBn: 'জনসংখ্যা, মানববসতি, সম্পদ ও শিল্প এবং বাংলাদেশের ভৌগোলিক বিবরণ',
            topics: [
              { id: 't_sgeo_2', title: 'Physiography of Bangladesh, Rivers, Climate, Natural Disasters & Transport', titleBn: 'বাংলাদেশের ভূপ্রকৃতি, নদ-নদী, জলবায়ু, বন্যা-ঘূর্ণিঝড় ও যোগাযোগ ব্যবস্থা', status: 'reading' },
            ],
          },
        ],
      },
      {
        id: 'subj_ssc_civ',
        userId,
        name: 'Civics and Citizenship',
        nameBn: 'পৌরনীতি ও নাগরিকতা',
        paper: 'General',
        color: '#3B82F6',
        icon: 'Landmark',
        chapters: [
          {
            id: 'ch_sciv_1',
            title: 'Civics, Citizen Rights, Law, Liberty, Equality, State & Government',
            titleBn: 'পৌরনীতি ও নাগরিকতা, আইন, স্বাধীনতা ও সাম্য, রাষ্ট্র ও সরকার ব্যবস্থা',
            topics: [
              { id: 't_sciv_1', title: 'Qualities of Good Citizens, Rights & Duties, Democracy vs Dictatorship & Constitution', titleBn: 'সুনাগরিকের গুণাবলি, অধিকার ও কর্তব্য, গণতন্ত্র ও সংবিধান', status: 'completed' },
            ],
          },
          {
            id: 'ch_sciv_2',
            title: 'Government of Bangladesh, Political Parties, Elections, Local Govt & UN',
            titleBn: 'বাংলাদেশের সরকার ব্যবস্থা, রাজনৈতিক দল, নির্বাচন, স্থানীয় সরকার ও জাতিসংঘ',
            topics: [
              { id: 't_sciv_2', title: 'Executive, Legislature, Judiciary, Union Parishad, City Corporation & SAARC/UN', titleBn: 'শাসন, আইন ও বিচার বিভাগ, ইউনিয়ন পরিষদ এবং জাতিসংঘ ও সার্ক', status: 'not_started' },
            ],
          },
        ],
      },
      {
        id: 'subj_ssc_eco',
        userId,
        name: 'Economics (SSC)',
        nameBn: 'অর্থনীতি (নবম-দশম)',
        paper: 'General',
        color: '#14B8A6',
        icon: 'TrendingUp',
        chapters: [
          {
            id: 'ch_seco_1',
            title: 'Introduction to Economics, Utility, Demand, Supply & Production',
            titleBn: 'অর্থনীতি পরিচয়, উপযোগ, চাহিদা, যোগান ও উৎপাদন',
            topics: [
              { id: 't_seco_1', title: 'Law of Diminishing Marginal Utility, Demand-Supply Equilibrium & Factors of Production', titleBn: 'ক্রমহ্রাসমান প্রান্তিক উপযোগ বিধি, চাহিদা-যোগান ভারসাম্য ও উৎপাদনের উপকরণ', status: 'reading' },
            ],
          },
          {
            id: 'ch_seco_2',
            title: 'Market, National Income, Money/Banking & Economy of Bangladesh',
            titleBn: 'বাজার, জাতীয় আয়, অর্থ ও ব্যাংক ব্যবস্থা এবং বাংলাদেশের অর্থনীতি',
            topics: [
              { id: 't_seco_2', title: 'GDP/GNI, Central & Commercial Banks, Government Finance & Budget of Bangladesh', titleBn: 'জিডিপি ও জিএনআই, কেন্দ্রীয় ও বাণিজ্যিক ব্যাংক এবং বাংলাদেশের বাজেট', status: 'not_started' },
            ],
          },
        ],
      },
      {
        id: 'subj_ssc_gsci',
        userId,
        name: 'General Science (SSC)',
        nameBn: 'সাধারণ বিজ্ঞান',
        paper: 'General',
        color: '#8B5CF6',
        icon: 'Atom',
        chapters: [
          {
            id: 'ch_sgsci_1',
            title: 'Food & Nutrition, Water for Life, Heart & Blood, Genetics & Acids-Bases',
            titleBn: 'উন্নততর জীবনধারা, জীবনের জন্য পানি, হৃদযন্ত্রের যত কথা ও অম্ল-ক্ষারক-লবণ',
            topics: [
              { id: 't_sgsci_1', title: 'Vitamins, BMI, Water Pollution, Blood Groups, pH & Neutralization', titleBn: 'খাদ্যপ্রাণ, রক্তের গ্রুপ, পানির দূষণ ও অম্ল-ক্ষার প্রশমন', status: 'completed' },
            ],
          },
          {
            id: 'ch_sgsci_2',
            title: 'Force, Light, Daily Electricity, Biotechnology & Disaster Management',
            titleBn: 'বল ও গতি, আলো, প্রাত্যহিক জীবনে তড়িৎ, জীবপ্রযুক্তি ও দুর্যোগ ব্যবস্থাপনা',
            topics: [
              { id: 't_sgsci_2', title: 'Lenses & Eye Defects (Myopia/Hypermetropia), Electric Bill Calculation & DNA Fingerprinting', titleBn: 'চোখের ত্রুটি ও লেন্স, বৈদ্যুতিক বিল হিসাব ও ডিএনএ টেস্ট', status: 'not_started' },
            ],
          },
        ],
      },
      {
        id: 'subj_ssc_math_h',
        userId,
        name: 'General Mathematics',
        nameBn: 'সাধারণ গণিত',
        paper: 'General',
        color: '#EC4899',
        icon: 'Calculator',
        chapters: [
          {
            id: 'ch_smh_1',
            title: 'Real Numbers, Sets, Algebra, Geometry, Trigonometry & Statistics',
            titleBn: 'বাস্তব সংখ্যা, সেট, বীজগণিত, জ্যামিতি, ত্রিকোণমিতি ও পরিসংখ্যান',
            topics: [
              { id: 't_smh_1', title: 'Algebraic Formulas, Circle Theorems, Trigonometric Ratios & Statistics', titleBn: 'বীজগাণিতিক রাশি, বৃত্ত উপপাদ্য, ত্রিকোণমিতি ও পরিসংখ্যান', status: 'reading' },
            ],
          },
        ],
      },
    ];
  }

  // HSC Humanities Complete Syllabus (All Subjects & Papers)
  return [
    {
      id: 'subj_hsc_civ1',
      userId,
      name: 'Civics & Good Governance 1st Paper',
      nameBn: 'পৌরনীতি ও সুশাসন ১ম পত্র',
      paper: '1st Paper',
      color: '#3B82F6',
      icon: 'Landmark',
      chapters: [
        {
          id: 'ch_civ1_1',
          title: 'Ch 1 & 2: Introduction to Civics & Good Governance',
          titleBn: 'অধ্যায় ১ ও ২: পৌরনীতি ও সুশাসন পরিচিতি এবং সুশাসন',
          topics: [
            { id: 't_civ1_1_1', title: 'Origin, Scope & Importance of Civics and Good Governance', titleBn: 'পৌরনীতি ও সুশাসনের ধারণা, পরিধি ও গুরুত্ব', status: 'completed' },
            { id: 't_civ1_1_2', title: 'Elements, Obstacles & Remedies for Establishing Good Governance', titleBn: 'সুশাসনের উপাদান, প্রতিবন্ধকতা ও উত্তরণের উপায়', status: 'revised' },
          ],
        },
        {
          id: 'ch_civ1_2',
          title: 'Ch 3, 4 & 5: Values, Law, Liberty, Equality, e-Governance & Human Rights',
          titleBn: 'অধ্যায় ৩, ৪ ও ৫: মূল্যবোধ, আইন, স্বাধীনতা-সাম্য, ই-গভর্ন্যান্স ও মানবাধিকার',
          topics: [
            { id: 't_civ1_2_1', title: 'Democratic Values, Rule of Law, Sources of Law & Safeguards of Liberty', titleBn: 'গণতান্ত্রিক মূল্যবোধ, আইনের শাসন, আইনের উৎস ও স্বাধীনতার রক্ষাকবচ', status: 'reading' },
            { id: 't_civ1_2_2', title: 'e-Governance Benefits, Right to Information Act & UN Declaration of Human Rights', titleBn: 'ই-গভর্ন্যান্সের সুবিধা, তথ্য অধিকার আইন ও জাতিসংঘ মানবাধিকার সনদ', status: 'not_started' },
          ],
        },
        {
          id: 'ch_civ1_3',
          title: 'Ch 6 & 7: Political Parties, Leadership & Organs of Government',
          titleBn: 'অধ্যায় ৬ ও ৭: রাজনৈতিক দল, নেতৃত্ব এবং সরকার কাঠামো ও অঙ্গসমূহ',
          topics: [
            { id: 't_civ1_3_1', title: 'Functions of Political Parties, Pressure Groups & Qualities of Charismatic/Democratic Leadership', titleBn: 'রাজনৈতিক দলের কার্যাবলি, চাপ সৃষ্টিকারী গোষ্ঠী ও নেতৃত্বের গুণাবলি', status: 'not_started' },
            { id: 't_civ1_3_2', title: 'Parliamentary vs Presidential Govt, Unitary vs Federal, Legislature, Executive & Independence of Judiciary', titleBn: 'সংসদীয় ও রাষ্ট্রপতি শাসিত সরকার, আইন-শাসন-বিচার বিভাগ ও বিচার বিভাগের স্বাধীনতা', status: 'not_started' },
          ],
        },
        {
          id: 'ch_civ1_4',
          title: 'Ch 8, 9 & 10: Public Opinion, Bureaucracy & Patriotism/Nationality',
          titleBn: 'অধ্যায় ৮, ৯ ও ১০: জনমত, জনসেবা ও আমলাতন্ত্র এবং দেশপ্রেম ও জাতীয়তা',
          topics: [
            { id: 't_civ1_4_1', title: 'Agencies of Public Opinion, Max Weber Bureaucracy & Elements of Nationality', titleBn: 'জনমত গঠনের মাধ্যম, আমলাতন্ত্রের বৈশিষ্ট্য এবং জাতি ও জাতীয়তার উপাদান', status: 'not_started' },
          ],
        },
      ],
    },
    {
      id: 'subj_hsc_civ2',
      userId,
      name: 'Civics & Good Governance 2nd Paper',
      nameBn: 'পৌরনীতি ও সুশাসন ২য় পত্র',
      paper: '2nd Paper',
      color: '#2563EB',
      icon: 'Landmark',
      chapters: [
        {
          id: 'ch_civ2_1',
          title: 'Ch 1 & 2: Representative Govt in British India & Pakistan to Bangladesh (1947-1971)',
          titleBn: 'অধ্যায় ১ ও ২: ব্রিটিশ ভারতে প্রতিনিধিত্বশীল সরকার এবং পাকিস্তান থেকে বাংলাদেশ (১৯৪৭-১৯৭১)',
          topics: [
            { id: 't_civ2_1_1', title: 'Indian Councils Acts (1909, 1919), Govt of India Act 1935, Lahore Resolution 1940 & Indian Independence Act 1947', titleBn: '১৯০৯ ও ১৯১৯ সালের সংস্কার আইন, ১৯৩৫ সালের ভারত শাসন আইন, লাহোর প্রস্তাব ও ১৯৪৭ ভারত স্বাধীনতা আইন', status: 'completed' },
            { id: 't_civ2_1_2', title: 'Language Movement 1952, 1954 United Front Election, 1956 Constitution, 1966 Six-Point Movement, 1969 Mass Upsurge, 1970 Election & 1971 Liberation War', titleBn: 'ভাষা আন্দোলন ১৯৫২, যুক্তফ্রন্ট নির্বাচন ১৯৫৪, ঐতিহাসিক ৬ দফা, ১৯৬৯ গণঅভ্যুত্থান, ১৯৭০ নির্বাচন ও মহান মুক্তিযুদ্ধ ১৯৭১', status: 'reading' },
          ],
        },
        {
          id: 'ch_civ2_2',
          title: 'Ch 3 & 4: Political Personalities & Constitution of Bangladesh',
          titleBn: 'অধ্যায় ৩ ও ৪: রাজনৈতিক ব্যক্তিত্ব এবং বাংলাদেশের সংবিধান',
          topics: [
            { id: 't_civ2_2_1', title: 'Nawab Salimullah, C.R. Das, A.K. Fazlul Huq, H.S. Suhrawardy, Maulana Bhashani & Bangabandhu Sheikh Mujibur Rahman', titleBn: 'নবাব সলিমুল্লাহ, শেরে বাংলা এ.কে. ফজলুল হক, হোসেন শহীদ সোহরাওয়ার্দী, মওলানা ভাসানী ও বঙ্গবন্ধু শেখ মুজিবুর রহমান', status: 'not_started' },
            { id: 't_civ2_2_2', title: '1972 Constitution Formulation, Fundamental Principles, Fundamental Rights & Constitutional Amendments', titleBn: '১৯৭২ সালের সংবিধান প্রণয়ন, রাষ্ট্রপরিচালনার মূলনীতি, মৌলিক অধিকার ও সংবিধানের সংশোধনীসমূহ', status: 'not_started' },
          ],
        },
        {
          id: 'ch_civ2_3',
          title: 'Ch 5 to 10: Admin Structure, Local Govt, Constitutional Bodies, Elections & Foreign Policy',
          titleBn: 'অধ্যায় ৫-১০: বাংলাদেশের সরকার কাঠামো, স্থানীয় শাসন, সাংবিধানিক প্রতিষ্ঠান ও বৈদেশিক নীতি',
          topics: [
            { id: 't_civ2_3_1', title: 'President, Prime Minister, Jatiya Sangsad, Supreme Court, Secretariat & Field Administration (Divisional/DC/UNO)', titleBn: 'রাষ্ট্রপতি, প্রধানমন্ত্রী, জাতীয় সংসদ, সুপ্রিম কোর্ট এবং কেন্দ্রীয় ও মাঠ প্রশাসন (ডিসি ও ইউএনও)', status: 'not_started' },
            { id: 't_civ2_3_2', title: 'Public Service Commission (BPSC), Election Commission, Attorney General, CAG & Foreign Policy (UN, OIC, SAARC, Commonwealth)', titleBn: 'সরকারি কর্ম কমিশন (BPSC), নির্বাচন কমিশন, মহাহিসাব নিরীক্ষক এবং বাংলাদেশের পররাষ্ট্রনীতি', status: 'not_started' },
          ],
        },
      ],
    },
    {
      id: 'subj_hsc_eco1',
      userId,
      name: 'Economics 1st Paper (Micro & Macro)',
      nameBn: 'অর্থনীতি ১ম পত্র',
      paper: '1st Paper',
      color: '#10B981',
      icon: 'TrendingUp',
      chapters: [
        {
          id: 'ch_eco1_1',
          title: 'Ch 1 & 2: Basic Economic Problems & Consumer/Producer Behavior',
          titleBn: 'অধ্যায় ১ ও ২: মৌলিক অর্থনৈতিক সমস্যা এবং ভোক্তা ও উৎপাদকের আচরণ',
          topics: [
            { id: 't_eco1_1_1', title: 'Scarcity, Choice, Opportunity Cost, PPC (Production Possibility Curve) & Economic Systems (Capitalist, Socialist, Mixed, Islamic)', titleBn: 'দুষ্প্রাপ্যতা ও নির্বাচন, সুযোগ ব্যয়, উৎপাদন সম্ভাবনা রেখা (PPC) ও অর্থনৈতিক ব্যবস্থা', status: 'completed' },
            { id: 't_eco1_1_2', title: 'Total & Marginal Utility, Law of Demand & Supply, Market Equilibrium Calculation & Elasticity of Demand (Price, Income, Cross)', titleBn: 'মোট ও প্রান্তিক উপযোগ, চাহিদা ও যোগান সমীকরণ থেকে ভারসাম্য দাম-পরিমাণ নির্ণয় এবং চাহিদার স্থিতিস্থাপকতা', status: 'reading' },
          ],
        },
        {
          id: 'ch_eco1_2',
          title: 'Ch 3 & 4: Production, Cost/Revenue & Market Structures',
          titleBn: 'অধ্যায় ৩ ও ৪: উৎপাদন, উৎপাদন ব্যয় ও আয় এবং বাজার',
          topics: [
            { id: 't_eco1_2_1', title: 'Law of Variable Proportions, Returns to Scale, Short-Run/Long-Run Cost Curves (TFC, TVC, AC, MC) & Revenue (TR, AR, MR)', titleBn: 'পরিবর্তনীয় উপাদান অনুপাত বিধি, মাত্রাগত উৎপাদন এবং গড় ব্যয় (AC), প্রান্তিক ব্যয় (MC), গড় আয় (AR) ও প্রান্তিক আয় (MR)', status: 'not_started' },
            { id: 't_eco1_2_2', title: 'Short-Run Equilibrium of Firm under Perfect Competition vs Monopoly Market (Supernormal Profit, Normal Profit, Loss)', titleBn: 'পূর্ণ প্রতিযোগিতামূলক বাজার ও একচেটিয়া বাজারে ফার্মের স্বল্পকালীন ভারসাম্য ও মুনাফা নির্ণয়', status: 'not_started' },
          ],
        },
        {
          id: 'ch_eco1_3',
          title: 'Ch 9 & 10: Aggregate Income/Expenditure & Money and Banking',
          titleBn: 'অধ্যায় ৯ ও ১০: সামগ্রিক আয় ও ব্যয় এবং মুদ্রা ও ব্যাংক',
          topics: [
            { id: 't_eco1_3_1', title: 'GDP, GNP, NNP, Per Capita Income, Consumption Function (C = a + bY), Savings, Investment & National Income Equilibrium', titleBn: 'GDP, GNP, NNP, ভোগ অপেক্ষক (C = a + bY), সঞ্চয় অপেক্ষক ও জাতীয় আয়ের ভারসাম্য নির্ণয়', status: 'not_started' },
            { id: 't_eco1_3_2', title: 'Fisher Quantity Theory of Money (MV = PT), Credit Creation by Commercial Banks & Credit Control by Central Bank', titleBn: 'ফিশারের মুদ্রার পরিমাণ তত্ত্ব (MV = PT), বাণিজ্যিক ব্যাংকের ঋণ সৃজন ও কেন্দ্রীয় ব্যাংকের ঋণ নিয়ন্ত্রণ পদ্ধতি', status: 'not_started' },
          ],
        },
      ],
    },
    {
      id: 'subj_hsc_eco2',
      userId,
      name: 'Economics 2nd Paper (Bangladesh Economy)',
      nameBn: 'অর্থনীতি ২য় পত্র',
      paper: '2nd Paper',
      color: '#059669',
      icon: 'TrendingUp',
      chapters: [
        {
          id: 'ch_eco2_1',
          title: 'Ch 1, 2 & 3: Economy of Bangladesh, Agriculture & Industry',
          titleBn: 'অধ্যায় ১, ২ ও ৩: বাংলাদেশের অর্থনীতি, কৃষি এবং শিল্প',
          topics: [
            { id: 't_eco2_1_1', title: 'Characteristics of Bangladesh Economy, Agricultural Modernization, Crop Diversification, Climate Change Impact & Agricultural Credit', titleBn: 'বাংলাদেশের অর্থনীতির বৈশিষ্ট্য, কৃষির আধুনিকায়ন, শস্য বহুমুখীকরণ ও কৃষি ঋণ', status: 'completed' },
            { id: 't_eco2_1_2', title: 'Large, Medium, Small & Cottage Industries, Ready-Made Garments (RMG), Jute, Leather & PPP (Public-Private Partnership)', titleBn: 'বৃহৎ, মাঝারি, ক্ষুদ্র ও কুটির শিল্প, তৈরি পোশাক শিল্প (RMG), পাট শিল্প ও পিপিপি', status: 'reading' },
          ],
        },
        {
          id: 'ch_eco2_2',
          title: 'Ch 4, 7, 8 & 9: Population, Inflation, International Trade & Public Finance',
          titleBn: 'অধ্যায় ৪, ৭, ৮ ও ৯: জনসংখ্যা ও মানবসম্পদ, মুদ্রাস্ফীতি, আন্তর্জাতিক বাণিজ্য ও সরকারি অর্থব্যবস্থা',
          topics: [
            { id: 't_eco2_2_1', title: 'Malthusian vs Optimum Theory of Population, Demographic Dividend, Unemployment & Human Resource Development', titleBn: 'ম্যালথাসের জনসংখ্যা তত্ত্ব, কাম্য জনসংখ্যা তত্ত্ব, জনমিতিক লভ্যাংশ ও মানবসম্পদ উন্নয়ন', status: 'not_started' },
            { id: 't_eco2_2_2', title: 'Demand-Pull vs Cost-Push Inflation, Balance of Trade vs Balance of Payments, Remittance, Direct/Indirect Taxes (VAT) & Public Debt', titleBn: 'চাহিদা বৃদ্ধিজনিত ও ব্যয় বৃদ্ধিজনিত মুদ্রাস্ফীতি, লেনদেন ভারসাম্য, প্রবাসী আয় এবং প্রত্যক্ষ ও পরোক্ষ কর (VAT)', status: 'not_started' },
          ],
        },
      ],
    },
    {
      id: 'subj_hsc_hist1',
      userId,
      name: 'History 1st Paper (Bangladesh & South Asia)',
      nameBn: 'ইতিহাস ১ম পত্র',
      paper: '1st Paper',
      color: '#F59E0B',
      icon: 'BookOpen',
      chapters: [
        {
          id: 'ch_h1_1',
          title: 'Ch 1, 2 & 3: Arrival of Europeans, Company Rule & British Colonial Period',
          titleBn: 'অধ্যায় ১, ২ ও ৩: ইউরোপীয়দের আগমন, কোম্পানি শাসন ও ব্রিটিশ ঔপনিবেশিক আমল',
          topics: [
            { id: 't_h1_1_1', title: 'Portuguese, Dutch, French & British East India Company, Battle of Plassey (1757) & Battle of Buxar (1764)', titleBn: 'ইউরোপীয় বণিকদের আগমন, পলাশীর যুদ্ধ (১৭৫৭) এবং বক্সারের যুদ্ধ (১৭৬৪) ও দেওয়ানি লাভ', status: 'completed' },
            { id: 't_h1_1_2', title: 'Dual Administration, Great Famine of 1176, Permanent Settlement (1793), Titumir, Faraizi Movement, Raja Ram Mohan Roy & Vidyasagar', titleBn: 'দ্বৈত শাসন, ছিয়াত্তরের মন্বন্তর, চিরস্থায়ী বন্দোবস্ত, তিতুমীরের বাঁশের কেল্লা ও ফরায়েজি আন্দোলন', status: 'reading' },
            { id: 't_h1_1_3', title: '1857 Sepoy Mutiny, Partition of Bengal (1905), Muslim League (1906), Khilafat & Non-Cooperation, Bengal Pact & Lahore Resolution (1940)', titleBn: '১৮৫৭ সালের স্বাধীনতা সংগ্রাম, বঙ্গভঙ্গ (১৯০৫), মুসলিম লীগ প্রতিষ্ঠা, বেঙ্গল প্যাক্ট ও লাহোর প্রস্তাব (১৯৪০)', status: 'not_started' },
          ],
        },
        {
          id: 'ch_h1_2',
          title: 'Ch 4 to 8: Language Movement, Autonomy Struggle, 1971 Liberation War & Reconstruction',
          titleBn: 'অধ্যায় ৪-৮: ভাষা আন্দোলন, স্বাধিকার সংগ্রাম, মহান মুক্তিযুদ্ধ ও স্বাধীন বাংলাদেশের অভ্যুদয়',
          topics: [
            { id: 't_h1_2_1', title: 'Language Movement (1948-1952), 1954 Election, Six-Point Charter (1966), Agartala Case, 1969 Mass Uprising & 1970 General Election', titleBn: 'ভাষা আন্দোলন, ১৯৫৪ যুক্তফ্রন্ট নির্বাচন, ৬ দফা দাবি, আগরতলা মামলা, ৬৯-এর গণঅভ্যুত্থান ও ৭০-এর নির্বাচন', status: 'not_started' },
            { id: 't_h1_2_2', title: 'Historic 7th March Speech, Operation Searchlight, Mujibnagar Government, 11 Sectors of Liberation War & Contribution of World Powers/UN', titleBn: 'ঐতিহাসিক ৭ই মার্চের ভাষণ, মুজিবনগর সরকার গঠন, মুক্তিযুদ্ধের ১১টি সেক্টর এবং বৃহৎ শক্তিবর্গ ও প্রবাসীদের ভূমিকা', status: 'not_started' },
          ],
        },
      ],
    },
    {
      id: 'subj_hsc_hist2',
      userId,
      name: 'History 2nd Paper (Modern World History)',
      nameBn: 'ইতিহাস ২য় পত্র',
      paper: '2nd Paper',
      color: '#D97706',
      icon: 'BookOpen',
      chapters: [
        {
          id: 'ch_h2_1',
          title: 'Ch 1, 2 & 3: Industrial Revolution, French Revolution (1789) & World War I',
          titleBn: 'অধ্যায় ১, ২ ও ৩: শিল্প বিপ্লব, ফরাসি বিপ্লব (১৭৮৯) এবং প্রথম বিশ্বযুদ্ধ ও ভার্সাই সন্ধি',
          topics: [
            { id: 't_h2_1_1', title: 'Industrial Revolution in Britain, Causes of French Revolution, Role of Philosophers (Rousseau, Voltaire, Montesquieu) & Napoleon Bonaparte', titleBn: 'শিল্প বিপ্লব, ফরাসি বিপ্লবের কারণ, দার্শনিকদের অবদান এবং নেপোলিয়ন বোনাপার্টের সংস্কার', status: 'completed' },
            { id: 't_h2_1_2', title: 'Triple Alliance vs Triple Entente, Causes of WWI, Treaty of Versailles (1919) & League of Nations', titleBn: 'প্রথম বিশ্বযুদ্ধের কারণ ও ফলাফল, ভার্সাই সন্ধি (১৯১৯) এবং জাতিপুঞ্জ (League of Nations)', status: 'not_started' },
          ],
        },
        {
          id: 'ch_h2_2',
          title: 'Ch 4 to 7: Bolshevik Revolution (1917), Rise of Fascism/Nazism, World War II & Cold War',
          titleBn: 'অধ্যায় ৪-৭: রুশ বিপ্লব (১৯১৭), হিটলার ও মুসোলিনির উত্থান, দ্বিতীয় বিশ্বযুদ্ধ, জাতিসংঘ ও স্নায়ুযুদ্ধ',
          topics: [
            { id: 't_h2_2_1', title: 'Lenin & October Revolution 1917, Mussolini (Fascism) & Hitler (Nazism), WWII, Formation of UN (1945), Cold War (NATO vs Warsaw) & Collapse of USSR/Apartheid', titleBn: 'রুশ বলশেভিক বিপ্লব ও লেনিন, ফ্যাসিবাদ ও নাৎসিবাদ, দ্বিতীয় বিশ্বযুদ্ধ, জাতিসংঘ গঠন ও স্নায়ুযুদ্ধ', status: 'not_started' },
          ],
        },
      ],
    },
    {
      id: 'subj_hsc_ihc',
      userId,
      name: 'Islamic History & Culture (1st & 2nd Paper)',
      nameBn: 'ইসলামের ইতিহাস ও সংস্কৃতি (১ম ও ২য় পত্র)',
      paper: '1st Paper',
      color: '#14B8A6',
      icon: 'BookOpen',
      chapters: [
        {
          id: 'ch_ihc_1',
          title: '1st Paper: Pre-Islamic Arabia, Prophet Muhammad (PBUH), Khulafa-e-Rashideen, Umayyads & Abbasids',
          titleBn: '১ম পত্র: প্রাক-ইসলামি আরব, মহানবী (সা.), খোলাফায়ে রাশেদীন, উমাইয়া ও আব্বাসীয় খিলাফত',
          topics: [
            { id: 't_ihc_1_1', title: 'Ayyam-e-Jahiliya, Hijrat, Charter of Medina, Battles of Badr/Uhud/Khandaq, Treaty of Hudaybiyyah, Conquest of Makkah & Farewell Sermon', titleBn: 'আইয়ামে জাহেলিয়া, মদিনা সনদ, বদর-উহুদ-খন্দক যুদ্ধ, হুদায়বিয়ার সন্ধি, মক্কা বিজয় ও বিদায় হজের ভাষণ', status: 'completed' },
            { id: 't_ihc_1_2', title: 'Caliphates of Abu Bakr (RA), Umar (RA), Uthman (RA) & Ali (RA), Umayyad Administration (Abd al-Malik, Walid I, Umar II) & Abbasid Golden Age (Harun al-Rashid, Al-Mamun, Baitul Hikmah)', titleBn: 'খোলাফায়ে রাশেদীন, উমাইয়া শাসন (আবদুল মালিক, ওমর ইবনে আবদুল আজিজ) ও আব্বাসীয় স্বর্ণযুগ (বাইতুল হিকমাহ)', status: 'reading' },
          ],
        },
        {
          id: 'ch_ihc_2',
          title: '2nd Paper: Muslim Rule in India, Delhi Sultanate, Mughal Empire & Independent Bengal',
          titleBn: '২য় পত্র: ভারতে মুসলিম শাসন, দিল্লি সালতানাত, মুঘল সাম্রাজ্য ও বাংলায় মুসলিম শাসন',
          topics: [
            { id: 't_ihc_2_1', title: 'Conquest of Sindh (Muhammad bin Qasim), Ghaznavids, Muhammad Ghori, Qutb-ud-din Aibak, Iltutmish, Razia Sultana, Balban, Alauddin Khalji & Muhammad bin Tughlaq', titleBn: 'সিন্ধু বিজয়, সুলতান মাহমুদ, মুহাম্মদ ঘুরি, ইলতুৎমিশ, সুলতানা রাজিয়া, গিয়াসউদ্দিন বলবন ও আলাউদ্দিন খলজি', status: 'not_started' },
            { id: 't_ihc_2_2', title: 'Mughal Emperors (Babur, Humayun, Sher Shah Suri Reforms, Akbar Din-i-Ilahi/Mansabdari, Shah Jahan Architecture, Aurangzeb) & Ikhtiyar Uddin Bakhtiyar Khalji', titleBn: 'মুঘল সম্রাট বাবর, শেরশাহের সংস্কার, সম্রাট আকবরের মনসবদারি প্রথা, শাহজাহানের স্থাপত্য ও বখতিয়ার খলজির বাংলা বিজয়', status: 'not_started' },
          ],
        },
      ],
    },
    {
      id: 'subj_hsc_logic',
      userId,
      name: 'Logic (1st & 2nd Paper)',
      nameBn: 'যুক্তিবিদ্যা (১ম ও ২য় পত্র)',
      paper: '1st Paper',
      color: '#8B5CF6',
      icon: 'Cpu',
      chapters: [
        {
          id: 'ch_log_1',
          title: '1st Paper: Deductive Logic, Terms, Propositions, Predicables & Syllogism',
          titleBn: '১ম পত্র: যুক্তিবিদ্যা পরিচিতি, পদ ও বাক্য, বিধেক, আবর্তন-প্রতিবর্তন ও সহানুমান',
          topics: [
            { id: 't_log_1_1', title: 'Denotation & Connotation of Terms, Classification of Propositions (A, E, I, O), Square of Opposition & Immediate Inference (Conversion, Obversion)', titleBn: 'পদের ব্যক্ত্যর্থ ও জাত্যর্থ, যুক্তিবাক্যের শ্রেণিবিভাগ (A, E, I, O), পদের ব্যাপ্যতা এবং আবর্তন ও প্রতিবর্তন', status: 'reading' },
            { id: 't_log_1_2', title: 'Categorical Syllogism Rules, Fallacies (Four Terms, Undistributed Middle), Figures & Moods (Barbara, Celarent) and Predicables (Genus, Species, Differentia)', titleBn: 'নিরপেক্ষ সহানুমানের নিয়মাবলি, অনুপপত্তি (চতুষ্পদ ও অব্যাপ্য হেতু দোষ), সংস্থান ও মূর্তি এবং বিধেক', status: 'not_started' },
          ],
        },
        {
          id: 'ch_log_2',
          title: '2nd Paper: Logical Definition, Division, Induction, Hypothesis & Mill Methods',
          titleBn: '২য় পত্র: যৌক্তিক সংজ্ঞা, যৌক্তিক বিভাগ, আরোহ অনুমান, প্রকল্প ও মিলের পরীক্ষামূলক পদ্ধতি',
          topics: [
            { id: 't_log_2_1', title: 'Rules & Fallacies of Logical Definition & Division (Cross Division), Scientific vs Unscientific Induction, Causation & Hypothesis (Crucial Instance)', titleBn: 'যৌক্তিক সংজ্ঞা ও বিভাগের নিয়মাবলি ও অনুপপত্তি, বৈজ্ঞানিক ও অবৈজ্ঞানিক আরোহ, কার্যকারণ সম্পর্ক ও প্রকল্প', status: 'not_started' },
            { id: 't_log_2_2', title: "Mill's Experimental Methods (Method of Agreement, Difference, Joint Method, Concomitant Variations) & Explanation", titleBn: 'মিলের পরীক্ষামূলক পদ্ধতি (অন্বয়ী পদ্ধতি, ব্যতিরেকী পদ্ধতি, যৌথ অন্বয়ী-ব্যতিরেকী ও সহপরিবর্তন পদ্ধতি) এবং বৈজ্ঞানিক ব্যাখ্যা', status: 'not_started' },
          ],
        },
      ],
    },
    {
      id: 'subj_hsc_soc',
      userId,
      name: 'Sociology / Social Work (1st & 2nd Paper)',
      nameBn: 'সমাজবিজ্ঞান ও সমাজকর্ম (১ম ও ২য় পত্র)',
      paper: 'General',
      color: '#EC4899',
      icon: 'Globe',
      chapters: [
        {
          id: 'ch_soc_1',
          title: 'Origin of Sociology, Thinkers (Ibn Khaldun, Comte, Marx, Durkheim, Weber), Social Institutions & Stratification',
          titleBn: 'সমাজবিজ্ঞানের উৎপত্তি, সমাজবিজ্ঞানীদের অবদান (ইবনে খালদুন, অগাস্ট কোঁৎ, কার্ল মার্কস, ডুর্খেইম, ওয়েবার), সামাজিক প্রতিষ্ঠান ও স্তরবিন্যাস',
          topics: [
            { id: 't_soc_1_1', title: 'Culture vs Civilization, Cultural Lag (Ogburn), Marriage, Family, Kinship, Slavery, Caste, Estate & Social Mobility', titleBn: 'সংস্কৃতি ও সভ্যতা, অসম অগ্রগতি তত্ত্ব, বিবাহ ও পরিবার এবং সামাজিক স্তরবিন্যাস ও গতিশীলতা', status: 'completed' },
          ],
        },
        {
          id: 'ch_soc_2',
          title: 'Society of Bangladesh, Anthropology, Rural/Urban Society & Social Problems/Social Work',
          titleBn: 'বাংলাদেশের সমাজ ও সংস্কৃতি, নৃবিজ্ঞান, গ্রামীণ ও শহুরে সমাজ এবং সামাজিক সমস্যা ও প্রতিকার',
          topics: [
            { id: 't_soc_2_1', title: 'Ethnic Communities in Bangladesh (Chakma, Garo, Santal, Manipuri), Urbanization, Industrialization, Poverty, Unemployment & Social Security', titleBn: 'বাংলাদেশের ক্ষুদ্র নৃগোষ্ঠী (চাকমা, গারো, সাঁওতাল, মণিপুরি), নগরায়ণ, দারিদ্র্য ও সামাজিক নিরাপত্তা কর্মসূচি', status: 'not_started' },
          ],
        },
      ],
    },
    {
      id: 'subj_hsc_geo',
      userId,
      name: 'Geography (1st & 2nd Paper)',
      nameBn: 'ভূগোল (১ম ও ২য় পত্র)',
      paper: 'General',
      color: '#6366F1',
      icon: 'Globe',
      chapters: [
        {
          id: 'ch_geo_1',
          title: '1st Paper: Physical Geography (Landforms, Geomorphic Processes, Atmosphere, Climate, Hydrosphere & Biosphere)',
          titleBn: '১ম পত্র: প্রাকৃতিক ভূগোল (ভূমিরূপ পরিবর্তন, বায়ুমণ্ডল, জলবায়ু, বারিমণ্ডল ও জীবমণ্ডল)',
          topics: [
            { id: 't_geo_1_1', title: 'Plate Tectonics, Earthquakes, Volcanoes, Weathering, Fluvial Landforms, Wind/Pressure Belts, Cyclones & Ocean Floor/Currents', titleBn: 'প্লেট টেকটোনিক তত্ত্ব, বিচূর্ণীভবন, নদীর ক্ষয় ও সঞ্চয়জাত ভূমিরূপ, বায়ুচাপ বলয়, ঘূর্ণিঝড় এবং সমুদ্র তলদেশের ভূমিরূপ ও সমুদ্রস্রোত', status: 'reading' },
          ],
        },
        {
          id: 'ch_geo_2',
          title: '2nd Paper: Human Geography (Population, Migration, Agriculture, Minerals, Industry, Trade & Map Projections/GIS)',
          titleBn: '২য় পত্র: মানব ও আঞ্চলিক ভূগোল (জনসংখ্যা, অভিমন, কৃষি, খনিজ ও শক্তি সম্পদ, শিল্প ও মানচিত্র অভিক্ষেপ)',
          topics: [
            { id: 't_geo_2_1', title: 'Demographic Transition Model, Rice/Wheat/Tea/Cotton Cultivation, Iron/Coal/Petroleum Distribution & GIS/Map Projections', titleBn: 'জনসংখ্যা ট্রানজিশন মডেল, ধান-গম-চা চাষের ভৌগোলিক নিয়ামক, খনিজ তেল ও কয়লা এবং জিআইএস (GIS) ও মানচিত্র অভিক্ষেপ', status: 'not_started' },
          ],
        },
      ],
    },
  ];
}

export function getCommerceSubjects(userId: string, isHSC: boolean): Subject[] {
  if (!isHSC) {
    // SSC Commerce / Business Studies (Class 9-10)
    return [
      {
        id: 'subj_ssc_acc',
        userId,
        name: 'Accounting (SSC)',
        nameBn: 'হিসাববিজ্ঞান (নবম-দশম)',
        paper: 'General',
        color: '#F59E0B',
        icon: 'Calculator',
        chapters: [
          {
            id: 'ch_sacc_1',
            title: 'Transactions, Double Entry, Capital/Revenue & Accounts',
            titleBn: 'লেনদেন, দুতরফা দাখিলা পদ্ধতি, মূলধন ও মুনাফা জাতীয় লেনদেন এবং হিসাব (অধ্যায় ২-৫)',
            topics: [
              { id: 't_sacc_1', title: 'Accounting Equation (A = L + E), Debit-Credit Rules & Capital vs Revenue Expenditure', titleBn: 'হিসাব সমীকরণ (A = L + E), ডেবিট-ক্রেডিট নির্ণয় ও মূলধন/মুনাফা জাতীয় আয়-ব্যয়', status: 'completed' },
            ],
          },
          {
            id: 'ch_sacc_2',
            title: 'Journal, Ledger, Cash Book & Trial Balance',
            titleBn: 'জাবেদা, খতিয়ান, নগদান বই এবং রেওয়ামিল (অধ্যায় ৬-৯)',
            topics: [
              { id: 't_sacc_2', title: 'General & Special Journals, Moving Balance Ledger, Two/Three Column Cash Book & Trial Balance', titleBn: 'সাধারণ ও বিশেষ জাবেদা, চলমান জের ছকে খতিয়ান, দুই ও তিন ঘরা নগদান বই এবং রেওয়ামিল প্রস্তুতকরণ', status: 'reading' },
            ],
          },
          {
            id: 'ch_sacc_3',
            title: 'Financial Statements, Cost Price & Family Budget',
            titleBn: 'আর্থিক বিবরণী, পণ্যের ক্রয়মূল্য-বিক্রয়মূল্য ও পারিবারিক তহবিল (অধ্যায় ১০-১২)',
            topics: [
              { id: 't_sacc_3', title: 'Income Statement, Owner Equity Statement, Balance Sheet & Cost Sheet', titleBn: 'বিষদ আয় বিবরণী, মালিকানা স্বত্ব বিবরণী ও আর্থিক অবস্থার বিবরণী', status: 'not_started' },
            ],
          },
        ],
      },
      {
        id: 'subj_ssc_fin',
        userId,
        name: 'Finance and Banking (SSC)',
        nameBn: 'ফিন্যান্স ও ব্যাংকিং (নবম-দশম)',
        paper: 'General',
        color: '#10B981',
        icon: 'Landmark',
        chapters: [
          {
            id: 'ch_sfin_1',
            title: 'Time Value of Money, Risk & Uncertainty, Capital Budgeting & Cost of Capital',
            titleBn: 'অর্থের সময়মূল্য, ঝুঁকি ও অনিশ্চয়তা, মূলধন বাজেটিং ও মূলধন ব্যয় (অধ্যায় ৩-৬)',
            topics: [
              { id: 't_sfin_1', title: 'PV, FV, EAR, Standard Deviation of Risk, Payback Period, ARR & WACC', titleBn: 'বর্তমান ও ভবিষ্যৎ মূল্য, আদর্শ বিচ্যুতি, পে-ব্যাক সময়, গড় মুনাফার হার ও গড় মূলধন ব্যয়', status: 'completed' },
            ],
          },
          {
            id: 'ch_sfin_2',
            title: 'Share/Bond, Currency, Commercial Banks, Central Bank & Deposit Accounts',
            titleBn: 'শেয়ার-বন্ড, মুদ্রা ও ব্যাংকিং, বাণিজ্যিক ব্যাংক ও কেন্দ্রীয় ব্যাংক (অধ্যায় ৭-১৩)',
            topics: [
              { id: 't_sfin_2', title: 'Functions of Commercial Banks, Bank Deposit Accounts & Bangladesh Bank Credit Control', titleBn: 'বাণিজ্যিক ব্যাংকের কার্যাবলি, ব্যাংক হিসাব খোলা ও বাংলাদেশ ব্যাংকের ঋণ নিয়ন্ত্রণ', status: 'reading' },
            ],
          },
        ],
      },
      {
        id: 'subj_ssc_ent',
        userId,
        name: 'Business Entrepreneurship (SSC)',
        nameBn: 'ব্যবসায় উদ্যোগ (নবম-দশম)',
        paper: 'General',
        color: '#3B82F6',
        icon: 'TrendingUp',
        chapters: [
          {
            id: 'ch_sent_1',
            title: 'Business Environment, Entrepreneurship, Self-Employment & Ownership Forms',
            titleBn: 'ব্যবসায় পরিচিতি, ব্যবসায় উদ্যোগ, আত্মকর্মসংস্থান ও মালিকানার ভিত্তিতে ব্যবসায় (অধ্যায় ১-৪)',
            topics: [
              { id: 't_sent_1', title: 'Sole Proprietorship, Partnership, Joint Stock Company & Cooperative Society', titleBn: 'একমালিকানা, অংশীদারি, যৌথ মূলধনী ব্যবসায় ও সমবায় সমিতি', status: 'completed' },
            ],
          },
          {
            id: 'ch_sent_2',
            title: 'Legal Aspects, Business Plan, Industries, Management, Marketing & Ethics',
            titleBn: 'ব্যবসায়ের আইনগত দিক, ব্যবসায় পরিকল্পনা, ব্যবস্থাপনা, বিপণন ও ব্যবসায় নৈতিকতা (অধ্যায় ৫-১১)',
            topics: [
              { id: 't_sent_2', title: 'Patent, Trademark, Copyright, BSTI, Functions of Management & Marketing Channels', titleBn: 'পেটেন্ট, ট্রেডমার্ক, কপিরাইট, বিএসটিআই, ব্যবস্থাপনার কার্যাবলি ও বিপণন', status: 'not_started' },
            ],
          },
        ],
      },
      {
        id: 'subj_ssc_gsci_c',
        userId,
        name: 'General Science (SSC)',
        nameBn: 'সাধারণ বিজ্ঞান',
        paper: 'General',
        color: '#8B5CF6',
        icon: 'Atom',
        chapters: [
          {
            id: 'ch_sgsc_1',
            title: 'Nutrition, Water, Blood, Acid-Base, Light, Electricity & Biotechnology',
            titleBn: 'উন্নততর জীবনধারা, পানি, হৃদযন্ত্র, অম্ল-ক্ষারক, আলো ও প্রাত্যহিক জীবনে তড়িৎ',
            topics: [
              { id: 't_sgsc_1', title: 'BMI, Blood Groups, Neutralization, Lens & Electric Bill Calculation', titleBn: 'বিএমআই, রক্তের গ্রুপ, লেন্স ও বৈদ্যুতিক বিল হিসাব', status: 'reading' },
            ],
          },
        ],
      },
      {
        id: 'subj_ssc_math_c',
        userId,
        name: 'General Mathematics',
        nameBn: 'সাধারণ গণিত',
        paper: 'General',
        color: '#EC4899',
        icon: 'Calculator',
        chapters: [
          {
            id: 'ch_smc_1',
            title: 'Real Numbers, Sets, Profit-Loss/Simple-Compound Interest, Algebra, Geometry & Statistics',
            titleBn: 'বাস্তব সংখ্যা, সেট, মুনাফা ও চক্রবৃদ্ধি মুনাফা, বীজগণিত, জ্যামিতি ও পরিসংখ্যান',
            topics: [
              { id: 't_smc_1', title: 'Simple & Compound Interest (I=Prn, C=P(1+r)^n), Algebraic Expressions & Statistics', titleBn: 'সরল ও চক্রবৃদ্ধি মুনাফা, বীজগাণিতিক সূত্র ও পরিসংখ্যান', status: 'completed' },
            ],
          },
        ],
      },
    ];
  }

  // HSC Commerce / Business Studies Complete Syllabus (All Subjects & Papers)
  return [
    {
      id: 'subj_hsc_acc1',
      userId,
      name: 'Accounting 1st Paper',
      nameBn: 'হিসাববিজ্ঞান ১ম পত্র',
      paper: '1st Paper',
      color: '#F59E0B',
      icon: 'Calculator',
      chapters: [
        {
          id: 'ch_acc1_1',
          title: 'Ch 1 & 2: Introduction to Accounting & Books of Accounts',
          titleBn: 'অধ্যায় ১ ও ২: হিসাববিজ্ঞান পরিচিতি এবং হিসাবের বইসমূহ',
          topics: [
            { id: 't_acc1_1_1', title: 'Transaction Identification, Accounting Equation (A = L + OE) Tabular Summary & Debit-Credit Rules', titleBn: 'লেনদেন শনাক্তকরণ, হিসাব সমীকরণে (A = L + OE) লেনদেনের প্রভাব ও ডেবিট-ক্রেডিট নির্ণয়', status: 'completed' },
            { id: 't_acc1_1_2', title: 'Special Journals (Purchase, Sales, Cash Receipts/Payments), Two/Three Column & Petty Cash Book (Imprest System) and Ledger Posting', titleBn: 'বিশেষ জাবেদা, দুই ও তিন ঘরা নগদান বই, অগ্রদত্ত নিয়মে খুচরা নগদান বই এবং খতিয়ান প্রস্তুতকরণ', status: 'revised' },
          ],
        },
        {
          id: 'ch_acc1_2',
          title: 'Ch 3 & 4: Bank Reconciliation Statement & Trial Balance',
          titleBn: 'অধ্যায় ৩ ও ৪: ব্যাংক সমন্বয় বিবরণী এবং রেওয়ামিল',
          topics: [
            { id: 't_acc1_2_1', title: 'Bank Reconciliation: Single Balance (Traditional) Method & Both Balance (Corrected Balance) Method with Adjusting Entries', titleBn: 'ব্যাংক সমন্বয় বিবরণী: একক জের ও উভয় জের (সংশোধিত জের) পদ্ধতি এবং আমানতকারীর বইয়ে জাবেদা', status: 'reading' },
            { id: 't_acc1_2_2', title: 'Preparation of Trial Balance, Suspense Account & Rectification of One-Sided and Two-Sided Errors', titleBn: 'রেওয়ামিল প্রস্তুতকরণ, অনিশ্চিত হিসাব এবং একতরফা ও দুতরফা ভুল সংশোধনী দাখিলা', status: 'not_started' },
          ],
        },
        {
          id: 'ch_acc1_3',
          title: 'Ch 5, 6 & 7: Accounting Principles, Accounts Receivable & Worksheet',
          titleBn: 'অধ্যায় ৫, ৬ ও ৭: হিসাববিজ্ঞানের নীতিমালা, প্রাপ্য হিসাবসমূহের হিসাবরক্ষণ ও কার্যপত্র',
          topics: [
            { id: 't_acc1_3_1', title: 'GAAP Principles (Going Concern, Accrual, Matching, Conservatism, Cost Principle)', titleBn: 'হিসাববিজ্ঞানের প্রচলিত নীতিমালা ও সীমাবদ্ধতা (চলমান প্রতিষ্ঠান, বকেয়া, রক্ষণশীলতার নীতি)', status: 'not_started' },
            { id: 't_acc1_3_2', title: 'Bad Debts & Allowance for Doubtful Accounts (Direct Write-Off vs Allowance Method)', titleBn: 'অনাদায়ী পাওনা ও অনাদায়ী পাওনা সঞ্চিতি হিসাবভুক্তকরণ (ভবিষ্যৎ সঞ্চিতি পদ্ধতি)', status: 'not_started' },
            { id: 't_acc1_3_3', title: 'Adjusting Entries, Closing Entries, Reversing Entries & 8/10-Column Worksheet', titleBn: 'সমন্বয় দাখিলা, সমাপনী দাখিলা, বিপরীত দাখিলা এবং ৮ ও ১০ ঘরবিশিষ্ট কার্যপত্র (Worksheet)', status: 'not_started' },
          ],
        },
        {
          id: 'ch_acc1_4',
          title: 'Ch 8, 9 & 10: Accounting for Tangible/Intangible Assets, Financial Statements & Single Entry',
          titleBn: 'অধ্যায় ৮, ৯ ও ১০: দৃশ্যমান ও অদৃশ্যমান সম্পত্তির হিসাবরক্ষণ (অবচয়), আর্থিক বিবরণী ও একতরফা দাখিলা',
          topics: [
            { id: 't_acc1_4_1', title: 'Depreciation Methods: Straight-Line, Diminishing Balance, Sum-of-Years-Digits & Production Units Method', titleBn: 'অবচয় নির্ণয়: সরলরৈখিক পদ্ধতি ও ক্রমহ্রাসমান জের পদ্ধতি এবং অবচয় ও সম্পত্তি হিসাব প্রস্তুতকরণ', status: 'not_started' },
            { id: 't_acc1_4_2', title: 'Multi-Step Income Statement, Owner Equity Statement & Classified Balance Sheet with Adjustments', titleBn: 'বহুধাপ বিশিষ্ট বিষদ আয় বিবরণী, মালিকানা স্বত্ব বিবরণী ও শ্রেণিবিন্যাসকৃত আর্থিক অবস্থার বিবরণী', status: 'not_started' },
          ],
        },
      ],
    },
    {
      id: 'subj_hsc_acc2',
      userId,
      name: 'Accounting 2nd Paper',
      nameBn: 'হিসাববিজ্ঞান ২য় পত্র',
      paper: '2nd Paper',
      color: '#D97706',
      icon: 'Calculator',
      chapters: [
        {
          id: 'ch_acc2_1',
          title: 'Ch 1, 2 & 3: Non-Profit Organizations, Partnership Accounts & Cash Flow Statement',
          titleBn: 'অধ্যায় ১, ২ ও ৩: অব্যবসায়ী প্রতিষ্ঠানের হিসাব, অংশীদারি ব্যবসায় ও নগদ প্রবাহ বিবরণী',
          topics: [
            { id: 't_acc2_1_1', title: 'Receipts & Payments Account, Income & Expenditure Account and Opening Capital Fund of Clubs/Hospitals', titleBn: 'অব্যবসায়ী প্রতিষ্ঠানের প্রারম্ভিক মূলধন তহবিল, আয়-ব্যয় হিসাব ও আর্থিক অবস্থার বিবরণী', status: 'completed' },
            { id: 't_acc2_1_2', title: 'Partnership Profit & Loss Appropriation Account and Partners Capital/Current Accounts (Fixed vs Fluctuating)', titleBn: 'অংশীদারি ব্যবসায়ের লাভ-লোকসান আবণ্টন হিসাব এবং অংশীদারদের মূলধন ও চলতি হিসাব', status: 'reading' },
            { id: 't_acc2_1_3', title: 'Cash Flow Statement (Indirect Method): Operating, Investing & Financing Activities', titleBn: 'নগদ প্রবাহ বিবরণী (পরোক্ষ পদ্ধতি): পরিচালন, বিনিয়োগ ও অর্থায়ন কার্যাবলি হতে নগদ প্রবাহ', status: 'not_started' },
          ],
        },
        {
          id: 'ch_acc2_2',
          title: 'Ch 4, 5 & 6: Joint Stock Company Share Capital, Financial Statements & Ratio Analysis',
          titleBn: 'অধ্যায় ৪, ৫ ও ৬: যৌথ মূলধনী কোম্পানির মূলধন, আর্থিক বিবরণী ও আর্থিক বিবরণী বিশ্লেষণ',
          topics: [
            { id: 't_acc2_2_1', title: 'Share Issue at Par, at Premium & at Discount, Oversubscription Refunds & Balance Sheet Presentation', titleBn: 'সমহার, অধিহার ও অবহারে শেয়ার ইস্যুর জাবেদা, ব্যাংক হিসাব ও আর্থিক অবস্থার বিবরণী', status: 'not_started' },
            { id: 't_acc2_2_2', title: 'Company Financial Statements according to Companies Act 1994', titleBn: '১৯৯৪ সালের কোম্পানি আইন অনুযায়ী যৌথ মূলধনী কোম্পানির চূড়ান্ত হিসাব', status: 'not_started' },
            { id: 't_acc2_2_3', title: 'Ratio Analysis: Liquidity (Current, Quick/Acid Test), Profitability (Gross/Net Profit, ROCE) & Solvency (Debt-Equity, Inventory Turnover)', titleBn: 'অনুপাত বিশ্লেষণ: চলতি অনুপাত, তড়িৎ অনুপাত, কার্যকরী মূলধন অনুপাত, মোট ও নিট মুনাফা অনুপাত এবং মজুদ আবর্তন অনুপাত', status: 'not_started' },
          ],
        },
        {
          id: 'ch_acc2_3',
          title: 'Ch 7, 8, 9 & 10: Cost Accounting, Inventory Valuation (FIFO, LIFO, Weighted Avg) & Management Accounting',
          titleBn: 'অধ্যায় ৭, ৮, ৯ ও ১০: উৎপাদন ব্যয় হিসাব, মজুদ পণ্যের হিসাবরক্ষণ ও ব্যবস্থাপনা হিসাববিজ্ঞান',
          topics: [
            { id: 't_acc2_3_1', title: 'Statement of Cost (Prime Cost, Factory Cost, Cost of Production, Total Cost & Tender/Quotation Price) and Payroll Sheet', titleBn: 'উৎপাদন ব্যয় বিবরণী (মুখ্য ব্যয়, কারখানা ব্যয়, উৎপাদন ব্যয় ও মোট ব্যয়) এবং বেতন ও মজুরি বিবরণী', status: 'not_started' },
            { id: 't_acc2_3_2', title: 'Store Ledger Card under FIFO (First-In First-Out), LIFO & Weighted Average Methods', titleBn: 'মজুদ পণ্যের হিসাবরক্ষণ: FIFO (আগে আসলে আগে যায়), LIFO এবং ভারযুক্ত গড় পদ্ধতিতে মাল খতিয়ান', status: 'not_started' },
            { id: 't_acc2_3_3', title: 'CVP Analysis: Contribution Margin, P/V Ratio, Break-Even Point (BEP in Units & Taka) and Margin of Safety', titleBn: 'দত্তাংশ (Contribution Margin), সমচ্ছেদ বিন্দু (Break-Even Point), নিরাপত্তা প্রান্ত ও কাঙ্ক্ষিত মুনাফায় বিক্রয় নির্ণয়', status: 'not_started' },
          ],
        },
      ],
    },
    {
      id: 'subj_hsc_fin1',
      userId,
      name: 'Finance, Banking & Insurance 1st Paper (Finance)',
      nameBn: 'ফিন্যান্স, ব্যাংকিং ও বিমা ১ম পত্র',
      paper: '1st Paper',
      color: '#10B981',
      icon: 'Landmark',
      chapters: [
        {
          id: 'ch_fin1_1',
          title: 'Ch 1, 2 & 3: Introduction to Finance, Financial Markets & Time Value of Money',
          titleBn: 'অধ্যায় ১, ২ ও ৩: অর্থায়নের সূচনা, আর্থিক বাজার এবং অর্থের সময়মূল্য (TVM)',
          topics: [
            { id: 't_fin1_1_1', title: 'Goals of Business Finance (Profit Maximization vs Wealth Maximization), Money Market vs Capital Market (DSE, CSE, BSEC)', titleBn: 'অর্থায়নের লক্ষ্য (মুনাফা বনাম সম্পদ সর্বাধিকরণ) এবং মুদ্রাবাজার ও পুঁজিবাজার', status: 'completed' },
            { id: 't_fin1_1_2', title: 'Present Value (PV) & Future Value (FV) of Single/Mixed Cash Flows, Ordinary Annuity vs Annuity Due, Perpetuity, Loan Amortization & EAR', titleBn: 'এককালীন ও মিশ্র নগদ প্রবাহের PV ও FV, সাধারণ বৃত্তি ও অগ্রিম বৃত্তি, ঋণ পরিশোধ সূচি ও প্রকৃত সুদের হার (EAR)', status: 'revised' },
          ],
        },
        {
          id: 'ch_fin1_2',
          title: 'Ch 4, 5 & 6: Financial Analysis, Short-Term Financing & Valuation of Bonds and Shares',
          titleBn: 'অধ্যায় ৪, ৫ ও ৬: আর্থিক বিশ্লেষণ, স্বল্পমেয়াদি অর্থায়ন এবং দীর্ঘমেয়াদি অর্থায়ন (বন্ড ও শেয়ার মূল্যায়ন)',
          topics: [
            { id: 't_fin1_2_1', title: 'Operating & Financial Break-Even, Degree of Operating/Financial/Total Leverage (DOL, DFL, DTL) & Cost of Trade Credit/Commercial Paper', titleBn: 'পরিচালন ও আর্থিক লিভারেজ (DOL, DFL, DTL) এবং ব্যবসায়িক ঋণের ব্যয় ও স্বল্পমেয়াদি অর্থায়ন', status: 'reading' },
            { id: 't_fin1_2_2', title: 'Valuation of Coupon Bonds, Zero-Coupon Bonds & Perpetual Bonds, Current Yield, YTM, YTC & Dividend Discount Models (Zero/Constant Growth)', titleBn: 'বন্ডের বর্তমান মূল্য নির্ণয়, চলতি আয়ের হার (CY), মেয়াদপূর্তিতে আয়ের হার (YTM) এবং সাধারণ শেয়ারের মূল্য নির্ণয়', status: 'not_started' },
          ],
        },
        {
          id: 'ch_fin1_3',
          title: 'Ch 7, 8 & 9: Cost of Capital, Capital Budgeting & Risk and Return',
          titleBn: 'অধ্যায় ৭, ৮ ও ৯: মূলধন ব্যয়, মূলধন বাজেটিং ও বিনিয়োগ সিদ্ধান্ত এবং ঝুঁকি ও মুনাফার হার',
          topics: [
            { id: 't_fin1_3_1', title: 'Cost of Debt (Kd), Cost of Preferred Stock (Kp), Cost of Common Equity (Ke), Retained Earnings (Kr) & Weighted Average Cost of Capital (WACC)', titleBn: 'ঋণ মূলধন ব্যয়, অগ্রাধিকার শেয়ার ব্যয়, সাধারণ শেয়ার ব্যয় এবং ভারযুক্ত গড় মূলধন ব্যয় (WACC)', status: 'not_started' },
            { id: 't_fin1_3_2', title: 'Capital Budgeting Techniques: Payback Period (PBP), Accounting Rate of Return (ARR), Net Present Value (NPV), Internal Rate of Return (IRR) & Profitability Index (PI)', titleBn: 'পে-ব্যাক সময় (PBP), গড় মুনাফার হার (ARR), নিট বর্তমান মূল্য (NPV), অভ্যন্তরীণ আয়ের হার (IRR) ও লাভজনকতা সূচক (PI)', status: 'not_started' },
            { id: 't_fin1_3_3', title: 'Expected Return, Variance, Standard Deviation (σ), Coefficient of Variation (CV), Portfolio Risk/Covariance & CAPM (Security Market Line)', titleBn: 'প্রত্যাশিত আয়ের হার, আদর্শ বিচ্যুতি (σ), বিভেদাঙ্ক (CV), পোর্টফোলিও ঝুঁকি এবং মূলধন সম্পত্তি মূল্যায়ন মডেল (CAPM)', status: 'not_started' },
          ],
        },
      ],
    },
    {
      id: 'subj_hsc_fin2',
      userId,
      name: 'Finance, Banking & Insurance 2nd Paper (Banking & Insurance)',
      nameBn: 'ফিন্যান্স, ব্যাংকিং ও বিমা ২য় পত্র',
      paper: '2nd Paper',
      color: '#059669',
      icon: 'Landmark',
      chapters: [
        {
          id: 'ch_fin2_1',
          title: 'Ch 1, 2, 3 & 4: Bank System, Central Bank, Commercial Bank & Bank Accounts',
          titleBn: 'অধ্যায় ১-৪: ব্যাংক ব্যবস্থার ধারণা, কেন্দ্রীয় ব্যাংক, বাণিজ্যিক ব্যাংক ও ব্যাংক হিসাব',
          topics: [
            { id: 't_fin2_1_1', title: 'Classification of Banks (Unit vs Branch vs Chain/Group Banking), Functions of Bangladesh Bank & Quantitative/Qualitative Credit Control', titleBn: 'ব্যাংকের শ্রেণিবিভাগ (একক ও শাখা ব্যাংক), বাংলাদেশ ব্যাংকের কার্যাবলি এবং সংখ্যাত্মক ও গুণগত ঋণ নিয়ন্ত্রণ পদ্ধতি', status: 'completed' },
            { id: 't_fin2_1_2', title: 'Principles of Commercial Banking (Liquidity vs Profitability), Multiple Credit Creation & Types of Bank Accounts (Current, Savings, Fixed, DPS) with KYC', titleBn: 'বাণিজ্যিক ব্যাংকের মূলনীতি, বহুগুণ ঋণ সৃজন প্রক্রিয়া এবং চলতি, সঞ্চয়ী ও স্থায়ী হিসাব খোলার নিয়মাবলি', status: 'reading' },
          ],
        },
        {
          id: 'ch_fin2_2',
          title: 'Ch 5 to 9: Negotiable Instruments, Clearing House, Foreign Exchange/LC & Electronic Banking',
          titleBn: 'অধ্যায় ৫-৯: হস্তান্তরযোগ্য দলিল, নিকাশ ঘর, বৈদেশিক বিনিময় ও ইলেকট্রনিক ব্যাংকিং',
          topics: [
            { id: 't_fin2_2_1', title: 'Cheque (Bearer, Order, Crossed Cheque), Bill of Exchange, Promissory Note, Dishonor of Cheque & Clearing House (BACPS, BEFTN, RTGS)', titleBn: 'চেক (বাহক, হুকুম ও দাগকাটা চেক), বিনিময় বিল ও অঙ্গীকারপত্র, চেকের অমর্যাদা এবং নিকাশ ঘর (ক্লিয়ারিং হাউস)', status: 'not_started' },
            { id: 't_fin2_2_2', title: 'Letter of Credit (L/C), Exchange Rate Determination & Modern e-Banking (ATM, Debit/Credit Card, Mobile Financial Services/bKash/Nagad, Online Banking)', titleBn: 'প্রত্যয়পত্র (L/C), বৈদেশিক বিনিময় হার নির্ধারণ এবং ইলেকট্রনিক ও মোবাইল ব্যাংকিং', status: 'not_started' },
          ],
        },
        {
          id: 'ch_fin2_3',
          title: 'Ch 10, 11 & 12: Fundamentals of Insurance, Life Insurance & Marine/Fire Insurance',
          titleBn: 'অধ্যায় ১০, ১১ ও ১২: বিমার মৌলিক ধারণা, জীবন বিমা এবং নৌ ও অগ্নি বিমা',
          topics: [
            { id: 't_fin2_3_1', title: 'Principles of Insurance (Utmost Good Faith, Insurable Interest, Indemnity, Subrogation, Proximate Cause), Re-insurance vs Double Insurance', titleBn: 'বিমার মূলনীতি (পরম সদ্বিশ্বাস, বিমাযোগ্য স্বার্থ, ক্ষতিপূরণ, স্থলাভিষিক্তকরণ) এবং পুনর্বিমা ও দ্বৈত বিমা', status: 'not_started' },
            { id: 't_fin2_3_2', title: 'Life Insurance Policies, Surrender Value, Mortality Table, Marine Losses (Total vs Particular/General Average Loss) & Fire Insurance Claim Settlement', titleBn: 'জীবন বিমা পলিসির প্রকারভেদ, সমর্পণ মূল্য, নৌ-বিমার আংশিক ও সামগ্রিক ক্ষতি এবং অগ্নি বিমার দাবি আদায় পদ্ধতি', status: 'not_started' },
          ],
        },
      ],
    },
    {
      id: 'subj_hsc_bom1',
      userId,
      name: 'Business Organization & Management 1st Paper',
      nameBn: 'ব্যবসায় সংগঠন ও ব্যবস্থাপনা ১ম পত্র',
      paper: '1st Paper',
      color: '#3B82F6',
      icon: 'TrendingUp',
      chapters: [
        {
          id: 'ch_bom1_1',
          title: 'Ch 1, 2, 3 & 4: Business Concepts, Environment, Sole Proprietorship & Partnership',
          titleBn: 'অধ্যায় ১-৪: ব্যবসায়ের মৌলিক ধারণা, পরিবেশ, একমালিকানা ও অংশীদারি ব্যবসায়',
          topics: [
            { id: 't_bom1_1_1', title: 'Industry, Commerce & Direct Services, Macro/Micro Business Environment (PESTEL) in Bangladesh & Survival of Sole Proprietorship', titleBn: 'শিল্প, বাণিজ্য ও প্রত্যক্ষ সেবা, ব্যবসায়িক পরিবেশের উপাদান এবং বৃহদায়তন ব্যবসায়ের পাশে একমালিকানা টিকে থাকার কারণ', status: 'completed' },
            { id: 't_bom1_1_2', title: 'Partnership Act 1932, Partnership Deed, Registration Consequences, Types of Partners (Active, Sleeping, Nominal, Minor) & Dissolution of Firm', titleBn: '১৯৩২ সালের অংশীদারি আইন, চুক্তিপত্র, নিবন্ধন না করার ফলাফল, অংশীদারদের প্রকারভেদ (নাবালক, নামমাত্র, ঘুমন্ত) ও বিলোপসাধন', status: 'reading' },
          ],
        },
        {
          id: 'ch_bom1_2',
          title: 'Ch 5, 6 & 7: Joint Stock Company, Cooperative Society & State Enterprises',
          titleBn: 'অধ্যায় ৫, ৬ ও ৭: যৌথ মূলধনী ব্যবসায়, সমবায় সমিতি ও রাষ্ট্রীয় ব্যবসায়',
          topics: [
            { id: 't_bom1_2_1', title: 'Private vs Public Limited Company, Formation Stages, Memorandum of Association, Articles of Association, Prospectus & Share/Debenture', titleBn: 'প্রাইভেট ও পাবলিক লিমিটেড কোম্পানির পার্থক্য, কোম্পানি গঠনতন্ত্র (স্মারকলিপি ও পরিমেল নিয়মাবলি), বিবরণপত্র এবং শেয়ার ও ঋণপত্র', status: 'not_started' },
            { id: 't_bom1_2_2', title: 'Principles of Cooperatives (Equality, Unity, Democracy), Types of Cooperative Societies & Rationale of State-Owned Enterprises (WASA, BPDB, Biman)', titleBn: 'সমবায়ের মূলনীতি, সমবায় সমিতির প্রকারভেদ এবং রাষ্ট্রীয় ব্যবসায়ের যৌক্তিকতা', status: 'not_started' },
          ],
        },
        {
          id: 'ch_bom1_3',
          title: 'Ch 8 to 12: Legal Aspects, Support Services, Entrepreneurship, ICT in Business & CSR/Ethics',
          titleBn: 'অধ্যায় ৮-১২: ব্যবসায়ের আইনগত দিক, সহায়ক সেবা, ব্যবসায় উদ্যোগ, তথ্যপ্রযুক্তি ও নৈতিকতা',
          topics: [
            { id: 't_bom1_3_1', title: 'Trade License, Patent, Trademark, Copyright, ISO, BSTI, BSCIC, SME Foundation, E-Commerce (B2B, B2C) & Corporate Social Responsibility (CSR)', titleBn: 'ট্রেড লাইসেন্স, পেটেন্ট, ট্রেডমার্ক, কপিরাইট, BSTI, বিসিক, ই-কমার্স ও ব্যবসায়ের সামাজিক দায়বদ্ধতা (CSR)', status: 'not_started' },
          ],
        },
      ],
    },
    {
      id: 'subj_hsc_bom2',
      userId,
      name: 'Business Organization & Management 2nd Paper (Management)',
      nameBn: 'ব্যবসায় সংগঠন ও ব্যবস্থাপনা ২য় পত্র (ব্যবস্থাপনা)',
      paper: '2nd Paper',
      color: '#2563EB',
      icon: 'TrendingUp',
      chapters: [
        {
          id: 'ch_bom2_1',
          title: 'Ch 1, 2 & 3: Concept of Management, Principles of Management & Planning',
          titleBn: 'অধ্যায় ১, ২ ও ৩: ব্যবস্থাপনার ধারণা, ব্যবস্থাপনার নীতি এবং পরিকল্পনা প্রণয়ন ও সিদ্ধান্ত গ্রহণ',
          topics: [
            { id: 't_bom2_1_1', title: 'Management Cycle/Functions (POSDCORB), Levels of Management, Henry Fayol 14 Principles & F.W. Taylor Scientific Management', titleBn: 'ব্যবস্থাপনার চক্র/কার্যাবলি, ব্যবস্থাপনার স্তর, হেনরি ফেয়লের ১৪টি নীতি এবং এফ. ডব্লিউ. টেইলরের বৈজ্ঞানিক ব্যবস্থাপনা', status: 'completed' },
            { id: 't_bom2_1_2', title: 'Characteristics of Good Plan, Types of Plans (Standing vs Single-Use, Strategic vs Tactical) & Steps in Decision Making', titleBn: 'উত্তম পরিকল্পনার বৈশিষ্ট্য, পরিকল্পনার প্রকারভেদ (স্থায়ী ও একার্থক পরিকল্পনা) এবং সিদ্ধান্ত গ্রহণ প্রক্রিয়া', status: 'reading' },
          ],
        },
        {
          id: 'ch_bom2_2',
          title: 'Ch 4, 5 & 6: Organizing, Staffing & Leadership',
          titleBn: 'অধ্যায় ৪, ৫ ও ৬: সংগঠিতকরণ, কর্মীসংস্থান এবং নেতৃত্ব ও নির্দেশনা',
          topics: [
            { id: 't_bom2_2_1', title: 'Organizational Structures (Line, Line & Staff, Functional, Matrix, Committee), Delegation of Authority & Centralization vs Decentralization', titleBn: 'সংগঠন কাঠামোর প্রকারভেদ (সরলরৈখিক, কার্যভিত্তিক, ম্যাট্রিক্স ও কমিটি সংগঠন) এবং কর্তৃত্ব অর্পণ ও বিকেন্দ্রীকরণ', status: 'not_started' },
            { id: 't_bom2_2_2', title: 'Sources of Recruitment (Internal vs External), Selection Steps, Training & Leadership Styles (Autocratic, Democratic, Laissez-Faire, Paternalistic)', titleBn: 'কর্মী সংগ্রহের অভ্যন্তরীণ ও বাহ্যিক উৎস, কর্মী নির্বাচন পদ্ধতি, প্রশিক্ষণ এবং নেতৃত্বের প্রকারভেদ (স্বৈরতান্ত্রিক, গণতান্ত্রিক ও লাগামহীন নেতৃত্ব)', status: 'not_started' },
          ],
        },
        {
          id: 'ch_bom2_3',
          title: 'Ch 7, 8, 9 & 10: Motivation, Communication, Coordination & Controlling',
          titleBn: 'অধ্যায় ৭, ৮, ৯ ও ১০: প্রেষণা, যোগাযোগ, সমন্বয়সাধন এবং নিয়ন্ত্রণ',
          topics: [
            { id: 't_bom2_3_1', title: "Financial vs Non-Financial Incentives, Maslow's Hierarchy of Needs Theory & Herzberg's Two-Factor Theory", titleBn: 'আর্থিক ও অনার্থিক প্রেষণা, মাসলোর চাহিদা সোপান তত্ত্ব এবং হার্জবার্গের দ্বি-উপাদান তত্ত্ব', status: 'not_started' },
            { id: 't_bom2_3_2', title: 'Communication Process Model, Vertical/Horizontal/Diagonal Communication, Principles of Coordination & Controlling Steps/Techniques (PERT, Budgetary Control, BEP)', titleBn: 'যোগাযোগ প্রক্রিয়া, উল্লম্ব ও আনুভূমিক যোগাযোগ, সমন্বয়ের নীতিমালা এবং নিয়ন্ত্রণের পদক্ষেপ ও কৌশল (বাজেটীয় নিয়ন্ত্রণ ও PERT)', status: 'not_started' },
          ],
        },
      ],
    },
    {
      id: 'subj_hsc_pmm',
      userId,
      name: 'Production Management & Marketing (1st & 2nd Paper)',
      nameBn: 'উৎপাদন ব্যবস্থাপনা ও বিপণন (১ম ও ২য় পত্র)',
      paper: 'General',
      color: '#14B8A6',
      icon: 'Layers',
      chapters: [
        {
          id: 'ch_pmm_1',
          title: '1st Paper: Production, Utility, Factors of Production, Scale of Production, Quality Management & Layout',
          titleBn: '১ম পত্র: উৎপাদন ও উপযোগ, উৎপাদনের উপকরণ, উৎপাদন মাত্রা, মান ব্যবস্থাপনা ও বিন্যাস',
          topics: [
            { id: 't_pmm_1_1', title: 'Form, Place, Time, Possession & Service Utility, Productivity Calculation, Economies of Scale, Total Quality Management (TQM) & Plant Location/Layout', titleBn: 'রূপগত, স্থানগত, সময়গত ও স্বত্বগত উপযোগ, উৎপাদনশীলতা নির্ণয়, মিতব্যয়িতা, সার্বিক মান ব্যবস্থাপনা (TQM) এবং ব্যবসায়ের অবস্থান ও বিন্যাস', status: 'reading' },
          ],
        },
        {
          id: 'ch_pmm_2',
          title: '2nd Paper: Marketing Concepts, Functions, Market Segmentation, Marketing Mix (4Ps), Pricing, Distribution & Promotion',
          titleBn: '২য় পত্র: বিপণন পরিচিতি, বিপণন কার্যাবলি, বাজার বিভক্তিকরণ, বিপণন মিশ্রণ (4P), পণ্য ও প্রসার',
          topics: [
            { id: 't_pmm_2_1', title: 'Evolution of Marketing (Production, Product, Selling, Marketing, Societal & Holistic Concepts), Standardization, Grading, Packaging & Warehousing', titleBn: 'বিপণন মতবাদের বিবর্তন, প্রমিতকরণ (Standardization), পর্যায়িতকরণ (Grading), মোড়কীকরণ ও গুদামজাতকরণ', status: 'not_started' },
            { id: 't_pmm_2_2', title: 'Consumer vs Industrial Goods, Product Life Cycle (PLC), Pricing Strategies, Channels of Distribution & Promotional Mix (Advertising, Personal Selling, Sales Promotion, Publicity)', titleBn: 'ভোগ্যপণ্য ও শিল্পপণ্য, পণ্যের জীবনচক্র (PLC), মূল্য নির্ধারণ পদ্ধতি, বণ্টন প্রণালি এবং বিজ্ঞাপন ও ব্যক্তিক বিক্রয়', status: 'not_started' },
          ],
        },
      ],
    },
  ];
}

export function getDefaultSubjects(
  userId: string,
  department: AcademicDepartment,
  level: AcademicLevel
): Subject[] {
  const isHSC = level.startsWith('HSC');
  const compulsory = getCompulsorySubjects(userId, isHSC);

  if (department === 'Science') {
    return [...getScienceSubjects(userId, isHSC), ...compulsory];
  } else if (department === 'Commerce') {
    return [...getCommerceSubjects(userId, isHSC), ...compulsory];
  } else {
    return [...getHumanitiesSubjects(userId, isHSC), ...compulsory];
  }
}

export const MOTIVATIONAL_QUOTES = [
  {
    quote: 'The journey of a thousand miles begins with one step.',
    quoteBn: 'হাজার মাইলের যাত্রা শুরু হয় একটি মাত্র পদক্ষেপে।',
    author: 'Lao Tzu',
    authorBn: 'লাও জু',
  },
  {
    quote: 'Discipline is the bridge between goals and accomplishment.',
    quoteBn: 'শৃঙ্খলা হলো লক্ষ্য এবং অর্জনের মধ্যবর্তী সেতু।',
    author: 'Jim Rohn',
    authorBn: 'জিম রন',
  },
  {
    quote: 'Continuous effort—not strength or intelligence—is the key to unlocking our potential.',
    quoteBn: 'অবিরাম প্রচেষ্টা—শক্তি বা বুদ্ধিমত্তা নয়—আমাদের সক্ষমতাকে বিকশিত করার মূল চাবিকাঠি।',
    author: 'Winston Churchill',
    authorBn: 'উইনস্টন চার্চিল',
  },
  {
    quote: 'Every day is a new opportunity to build the future you envision.',
    quoteBn: 'প্রতিটি নতুন দিন তোমার স্বপ্নের ভবিষ্যৎ গড়ার এক উজ্জ্বল সুযোগ।',
    author: 'FocusForge Inspiration',
    authorBn: 'ফোকাসফোর্জ প্রেরণা',
  },
  {
    quote: 'Success does not come from what you do occasionally, it comes from what you do consistently.',
    quoteBn: 'সাফল্য মাঝে মাঝে কাজ করার মাধ্যমে আসে না, বরং তা অর্জিত হয় ধারাবাহিক কাজের মাধ্যমে।',
    author: 'FocusForge Inspiration',
    authorBn: 'ফোকাসফোর্জ প্রেরণা',
  },
];
