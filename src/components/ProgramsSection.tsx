import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, X, Users, Clock } from "lucide-react"
import { DownwardDog } from "./YogaLineArt"
import { ZoomOverlay, PhotoLightbox } from "./PhotoZoom"

type TableRow = { challenge: string; help: string }

type Program = {
  title: string
  ages: string
  levels: string
  tagline: string
  image: string
  cta: string
  challenges: string[]
  cardChallenges?: string[]
  table: TableRow[]
  levelsData: { name: string; subtitle: string; contents: string[] }[]
}

const programs: Program[] = [
  {
    title: "Young Yogis",
    ages: "Ages 4–9",
    levels: "2 Levels, 90 Days Each",
    tagline: "Growing Healthy Bodies & Happy Minds",
    image: "/programs/Young_Yogis.webp",
    cta: "Enquire Now",
    challenges: [
      "My child finds it difficult to sit calmly, even for a few minutes.",
      "My child struggles to concentrate during studies or conversations.",
      "My child spends too much time on mobile phones, tablets, or TV.",
      "My child has poor sitting posture and spends long hours on screens.",
      "My child lacks flexibility, balance, and physical coordination.",
      "My child becomes frustrated, angry, or emotional very easily.",
      "My child lacks confidence when speaking or participating in activities.",
      "My child has unhealthy eating habits or is a picky eater.",
      "My child has an irregular sleep routine.",
      "My child prefers indoor screen time instead of physical activities.",
      "My child finds it difficult to follow instructions or complete simple tasks independently.",
      "My child has limited social interaction because of excessive screen exposure.",
      "I want my child to develop self-discipline and healthy daily habits.",
      "I want my child to become more confident, responsible, and emotionally balanced.",
    ],
    cardChallenges: [
      "Difficulty concentrating during studies or conversations",
      "Excessive time spent on mobile phones, tablets, or TV",
      "Restlessness and difficulty sitting calmly",
      "Poor sitting posture from long hours on screens",
      "Frequent frustration, anger, or emotional outbursts",
      "Lack of confidence in speaking or participating in activities",
      "Poor flexibility, balance, and physical coordination",
      "Irregular sleep routine",
      "Unhealthy eating habits or picky eating",
      "Need for self-discipline and healthy daily habits",
    ],
    table: [
      { challenge: "Lack of Focus and Concentration", help: "Improves focus, attention, and learning ability" },
      { challenge: "Excessive Screen Time & Digital Addiction", help: "Encourages healthy, active lifestyle habits" },
      { challenge: "Poor Posture & Body Alignment", help: "Improves posture, breathing, and body awareness" },
      { challenge: "Short Attention Span", help: "Develops mindfulness and concentration skills" },
      { challenge: "Stress, Anxiety & Restlessness", help: "Promotes calmness, relaxation, and emotional balance" },
      { challenge: "Low Self-Confidence & Communication Issues", help: "Builds confidence, expression, and communication skills" },
      { challenge: "Poor Flexibility & Physical Fitness", help: "Enhances flexibility, balance, and physical strength" },
      { challenge: "Weak Memory & Learning Retention", help: "Improves memory, awareness, and learning capacity" },
      { challenge: "Poor Sleep Routine", help: "Supports relaxation and better sleep habits" },
      { challenge: "Lack of Self-Discipline & Responsibility", help: "Develops discipline, self-control, and positive habits" },
      { challenge: "Lacks self-discipline", help: "Builds self-control and positive habits" },
    ],
    levelsData: [
      {
        name: "Level 1 — Focus Foundations for Kids (90 Days)",
        subtitle: "",
        contents: [
          "Foundation Yoga Postures",
          "Breathing & Relaxation Techniques (Pranayama)",
          "Focus & Concentration Training",
          "Brain Development Activities",
          "Memory & Attention Enhancement Exercises",
          "Confidence & Communication Skills",
          "Emotional Intelligence & Self-Awareness",
          "Posture Correction & Body Awareness",
          "Healthy Lifestyle Habits & Wellness Education",
          "Fun Learning Through Games & Activities",
        ],
      },
      {
        name: "Level 2 — Focus Builders Club™ (90 Days)",
        subtitle: "",
        contents: [
          "Intermediate Yoga Practices",
          "Advanced Brain Development Activities",
          "Mindful Breathing Techniques",
          "Confidence & Leadership Development",
          "Emotional Intelligence & Resilience Building",
          "Social & Life Skills Development",
          "Healthy Lifestyle Habits",
          "Interactive Learning Activities",
          "Independent Yoga Practice",
          "Holistic Child Development",
        ],
      },
    ],
  },
  {
    title: "Youth Yogis",
    ages: "Ages 10–15",
    levels: "2 Levels, 90 Days Each",
    tagline: "Build Strong Habits. Build Strong Minds.",
    image: "/programs/kids-youth.webp",
    cta: "Enquire Now",
    challenges: [
      "Difficulty focusing on studies and daily tasks",
      "Short attention span and easily distracted",
      "Excessive screen time and digital dependency",
      "Poor memory and difficulty retaining information",
      "Lack of confidence and self-esteem",
      "Fear of speaking in front of others",
      "Difficulty communicating thoughts clearly",
      "Frequent stress, anxiety, or worry",
      "Emotional outbursts and impatience",
      "Low resilience when facing challenges",
      "Poor posture due to prolonged screen use",
      "Lack of physical fitness and flexibility",
      "Low energy and inactive lifestyle",
      "Difficulty following instructions",
      "Lack of self-discipline and responsibility",
      "Poor time management and study habits",
      "Weak problem-solving and critical thinking skills",
      "Difficulty working in teams and building friendships",
      "Limited leadership qualities and initiative",
      "Irregular sleep and unhealthy daily routines",
      "Poor eating habits and lifestyle choices",
      "Lack of motivation and goal-setting skills",
      "Difficulty managing emotions in different situations",
      "Reduced creativity and independent thinking",
      "Limited mindfulness and self-awareness",
    ],
    cardChallenges: [
      "Difficulty focusing on studies and daily tasks",
      "Excessive screen time and digital dependency",
      "Short attention span and easily distracted",
      "Poor memory and difficulty retaining information",
      "Lack of confidence and self-esteem",
      "Frequent stress, anxiety, or worry",
      "Poor posture due to prolonged screen use",
      "Lack of self-discipline and responsibility",
      "Poor time management and study habits",
      "Difficulty communicating thoughts clearly",
    ],
    table: [
      { challenge: "Lack of Focus and Concentration", help: "Improves attention, focus, and mindfulness through yoga and concentration practices" },
      { challenge: "Excessive Screen Time and Inactive Lifestyle", help: "Encourages healthy habits, physical activity, and balanced routines" },
      { challenge: "Low Confidence and Communication Skills", help: "Builds confidence through group activities, speaking practice, and leadership skills" },
      { challenge: "Stress, Anxiety, and Emotional Imbalance", help: "Develops emotional awareness, relaxation skills, and inner calmness" },
      { challenge: "Poor Memory and Learning Difficulties", help: "Supports memory enhancement and brain development activities" },
      { challenge: "Lack of Self-Discipline and Responsibility", help: "Builds positive habits, discipline, and self-management skills" },
      { challenge: "Poor Posture and Physical Fitness", help: "Improves posture, flexibility, balance, and body awareness" },
      { challenge: "Weak Social and Teamwork Skills", help: "Develops cooperation, teamwork, and leadership qualities" },
      { challenge: "Poor Study Habits and Time Management", help: "Teaches focus techniques, learning skills, and goal-setting habits" },
      { challenge: "Lack of Creativity and Problem-Solving Skills", help: "Encourages creative thinking, critical thinking, and independent learning" },
    ],
    levelsData: [
      {
        name: "Level 1 — Focus Foundations™ (90 Days)",
        subtitle: "Build Strong Habits. Build Strong Minds.",
        contents: [
          "Yoga & Physical Wellness Practices",
          "Breathing & Relaxation Techniques (Pranayama)",
          "Focus & Concentration Training",
          "Brain Development & Memory Enhancement Activities",
          "Emotional Intelligence & Stress Management",
          "Confidence & Communication Skills",
          "Leadership & Team-Building Activities",
          "Learning & Study Skills Development",
          "Healthy Lifestyle Habits & Self-Discipline",
          "Posture Correction & Body Awareness",
        ],
      },
      {
        name: "Level 2 — Focus Mastery™ (90 Days)",
        subtitle: "Develop Leadership. Unlock Your Full Potential.",
        contents: [
          "Advanced Yoga & Physical Conditioning",
          "Advanced Breath & Mind Training",
          "Advanced Brain Development Activities",
          "Memory & Creative Thinking Skills",
          "Focus & Academic Excellence Techniques",
          "Emotional Intelligence & Resilience Building",
          "Leadership & Public Speaking Skills",
          "Critical Thinking & Problem-Solving Skills",
          "Independent Learning & Goal Setting",
          "Healthy Lifestyle Mastery",
        ],
      },
    ],
  },
  {
    title: "Life Yogis",
    ages: "Ages 25–60",
    levels: "1 Level, 90 Days",
    tagline: "Transform Stress, Stiffness & Fatigue into Strength, Flexibility & Well-being",
    image: "/programs/adult.webp",
    cta: "Enquire Now",
    challenges: [
      "Lack of Physical Fitness & Flexibility",
      "Poor Posture & Body Alignment Issues",
      "Stress, Anxiety & Mental Fatigue",
      "Back, Neck & Shoulder Discomfort",
      "Poor Breathing Habits & Low Energy Levels",
      "Difficulty Relaxing and Managing Daily Pressure",
      "Lack of Mobility, Balance & Body Awareness",
      "Unhealthy Lifestyle Habits",
      "Poor Sleep Quality & Low Energy",
      "Difficulty Maintaining a Consistent Wellness Routine",
    ],
    table: [
      { challenge: "Lack of Physical Fitness and Flexibility", help: "Improves strength, flexibility, and overall physical wellness through Yoga Asanas" },
      { challenge: "Stress, Anxiety, and Mental Fatigue", help: "Promotes relaxation, mindfulness, and effective stress management techniques" },
      { challenge: "Poor Posture and Body Alignment", help: "Supports posture correction and improves body alignment awareness" },
      { challenge: "Back, Neck, and Shoulder Discomfort", help: "Teaches gentle yoga practices for mobility, flexibility, and body care" },
      { challenge: "Poor Breathing Habits and Low Energy Levels", help: "Develops breathing awareness and Pranayama practices for better energy management" },
      { challenge: "Difficulty Relaxing and Managing Daily Pressure", help: "Builds calmness through meditation and relaxation practices" },
      { challenge: "Reduced Mobility, Balance, and Body Awareness", help: "Enhances balance, coordination, and mindful movement" },
      { challenge: "Unhealthy Lifestyle Habits", help: "Encourages healthy routines and sustainable wellness habits" },
      { challenge: "Poor Sleep Quality and Low Energy", help: "Supports better sleep patterns and improves energy balance" },
      { challenge: "Difficulty Maintaining a Fitness Routine", help: "Builds consistency through regular yoga practice and long-term wellness discipline" },
    ],
    levelsData: [
      {
        name: "For Working Professionals (Age 25–45 Years)",
        subtitle: "",
        contents: [
          "Yoga Asana for Strength & Flexibility",
          "Posture Correction & Body Alignment",
          "Breathing Awareness & Pranayama Techniques",
          "Relaxation & Meditation Practices",
          "Stress Management & Mind Wellness",
          "Back, Neck & Shoulder Care Practices",
          "Mobility, Balance & Body Awareness Training",
          "Healthy Lifestyle Coaching",
          "Sleep, Digestion & Energy Improvement Practices",
          "Home Yoga Routine & Sustainable Wellness Habits",
        ],
      },
    ],
  },
  {
    title: "Golden Yogis",
    ages: "60+ Years",
    levels: "1 Level, 90 Days",
    tagline: "Move with Ease. Live with Confidence. Age with Grace.",
    image: "/programs/golden.webp",
    cta: "Enquire Now",
    challenges: [
      "Reduced flexibility and mobility",
      "Joint stiffness and muscle weakness",
      "Poor balance and coordination",
      "Back, neck, and joint discomfort",
      "Poor posture and body alignment",
      "Low energy levels and fatigue",
      "Stress, worry, and mental fatigue",
      "Poor sleep quality",
      "Reduced physical activity and inactive lifestyle",
      "Difficulty maintaining independence and daily wellness routines",
    ],
    table: [
      { challenge: "Reduced Flexibility and Mobility", help: "Improves flexibility, joint mobility, and ease of movement through gentle yoga practices" },
      { challenge: "Body Stiffness and Muscle Weakness", help: "Supports strength, balance, and overall physical wellness" },
      { challenge: "Balance Issues and Fear of Falling", help: "Enhances balance, coordination, and body stability" },
      { challenge: "Poor Posture and Body Alignment", help: "Promotes better posture and body awareness" },
      { challenge: "Stress, Worry, and Mental Fatigue", help: "Encourages relaxation, meditation, and mental calmness" },
      { challenge: "Breathing Difficulties and Low Energy Levels", help: "Develops breathing awareness and Pranayama practices for improved energy management" },
      { challenge: "Back, Neck, and Joint Discomfort", help: "Provides gentle movements for mobility, flexibility, and body care" },
      { challenge: "Poor Sleep Quality", help: "Encourages relaxation techniques and healthy sleep routines" },
      { challenge: "Sedentary Lifestyle and Reduced Activity", help: "Promotes active living and regular wellness habits" },
      { challenge: "Reduced Confidence and Independence", help: "Builds self-awareness, positivity, and confidence in daily activities" },
    ],
    levelsData: [
      {
        name: "Senior Citizen Yoga Program",
        subtitle: "",
        contents: [
          "Gentle Yoga Postures for Healthy Ageing",
          "Breathing Exercises & Pranayama Practices",
          "Chair Yoga & Adaptive Yoga Techniques",
          "Joint Mobility & Flexibility Training",
          "Balance & Fall Prevention Exercises",
          "Strengthening & Functional Movement Practices",
          "Posture Correction & Body Awareness",
          "Memory, Coordination & Mind Activities",
          "Relaxation & Meditation Practices",
          "Healthy Lifestyle & Wellness Education",
        ],
      },
    ],
  },
  {
    title: "Motherhood Yogis",
    ages: "Prenatal & Postnatal",
    levels: "Custom Duration",
    tagline: "Nurturing the Mother, Nurturing the Baby, Nurturing Life.",
    image: "/programs/prenatal.webp",
    cta: "Enquire Now",
    challenges: [
      "Physical fatigue and low energy",
      "Back, neck, and shoulder discomfort",
      "Stress and emotional pressure",
      "Lack of time for self-care",
      "Poor sleep and tiredness",
      "Reduced physical activity after childbirth",
      "Changes in body confidence",
      "Poor posture and body stiffness",
      "Difficulty managing emotions and daily responsibilities",
      "Balancing family needs and personal wellbeing",
    ],
    table: [
      { challenge: "Physical Fatigue Due to Pregnancy and Motherhood Responsibilities", help: "Supports body strength, flexibility, and energy through gentle yoga practices" },
      { challenge: "Back Pain, Neck Tension, and Body Stiffness", help: "Improves posture, mobility, and body awareness through mindful movements" },
      { challenge: "Stress, Emotional Changes, and Mental Pressure", help: "Encourages relaxation, mindfulness, and emotional balance" },
      { challenge: "Lack of Time for Self-Care", help: "Helps build simple, practical, and sustainable wellness routines" },
      { challenge: "Poor Sleep and Constant Tiredness", help: "Promotes relaxation techniques and healthy sleep habits" },
      { challenge: "Reduced Physical Activity After Childbirth", help: "Supports gradual movement, flexibility, and overall physical fitness" },
      { challenge: "Changes in Body Confidence", help: "Builds self-awareness, confidence, and a positive connection with the body" },
      { challenge: "Breathing Difficulties and Low Energy Levels", help: "Develops breathing awareness and Pranayama practices for better energy management" },
      { challenge: "Difficulty Managing Emotions and Daily Responsibilities", help: "Enhances calmness, patience, and inner strength" },
      { challenge: "Balancing Family Needs and Personal Wellbeing", help: "Encourages mindful living and a healthier lifestyle balance" },
    ],
    levelsData: [
      {
        name: "Prenatal & Postnatal Program",
        subtitle: "",
        contents: [
          "Gentle Yoga Practices for Pregnancy & Recovery",
          "Breathing Techniques (Pranayama) & Relaxation",
          "Meditation & Stress Management Practices",
          "Pelvic Awareness & Mobility Training",
          "Pregnancy Discomfort Management Techniques",
          "Childbirth Preparation & Positive Mindset Building",
          "Postnatal Recovery & Strength Restoration",
          "Posture Correction & Body Alignment",
          "Pelvic Floor Awareness & Energy Balance",
          "Mother–Baby Bonding & Wellness Practices",
        ],
      },
    ],
  },
]

function ProgramModal({ program, onClose }: { program: Program; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] bg-black/80 flex items-end md:items-center justify-center md:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${program.title} program details`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 40 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-t-2xl md:rounded-2xl max-w-3xl w-full h-[100dvh] md:h-auto md:max-h-[85vh] flex flex-col overflow-hidden shadow-2xl"
      >
        <div className="shrink-0 bg-white border-b border-rose/30 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between rounded-t-2xl z-10">
          <div className="min-w-0 pr-3">
            <h3 className="text-lg sm:text-xl font-bold font-heading text-wine">{program.title}</h3>
            <p className="text-xs sm:text-sm text-charcoal-light">{program.ages} • {program.levels}</p>
          </div>
          <button onClick={onClose} aria-label="Close program details" className="h-8 w-8 shrink-0 rounded-full bg-rose/30 flex items-center justify-center hover:bg-rose transition-colors">
            <X className="h-4 w-4 text-wine" />
          </button>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-4 sm:p-6 space-y-6 sm:space-y-8">
          {program.levelsData.map((level, li) => (
            <div key={li}>
              <h4 className="text-lg font-bold text-wine mb-1">{level.name}</h4>
              {level.subtitle && <p className="text-sm italic font-accent text-gold-deep mb-4">{level.subtitle}</p>}

              <h5 className="text-sm font-semibold text-wine uppercase tracking-wider mb-3">Course Contents</h5>
              <ul className="space-y-2.5">
                {level.contents.map((item, ci) => (
                  <li key={ci} className="flex items-start gap-2 text-base text-charcoal-light">
                    <span className="h-5 w-5 rounded-full bg-wine/10 text-wine flex items-center justify-center text-[10px] font-bold shrink-0 mt-1">{ci + 1}</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="pt-6 border-t border-rose/30">
            <h4 className="text-lg font-bold font-heading text-wine mb-1">Challenges &amp; How Our Program Helps</h4>
            <div className="hidden md:block overflow-x-auto rounded-xl border border-rose/30 mt-4">
              <table className="w-full min-w-[560px] text-left">
                <thead>
                  <tr className="bg-wine text-white">
                    <th className="px-4 py-3 text-sm font-semibold">Challenges</th>
                    <th className="px-4 py-3 text-sm font-semibold">How Our Program Helps</th>
                  </tr>
                </thead>
                <tbody>
                  {program.table.map((row, ri) => (
                    <tr key={ri} className={ri % 2 === 0 ? "bg-white" : "bg-cream/60"}>
                      <td className="px-4 py-3 text-sm text-charcoal font-medium border-t border-rose/20 align-top">{row.challenge}</td>
                      <td className="px-4 py-3 text-sm text-charcoal-light border-t border-rose/20 align-top">{row.help}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden rounded-xl border border-rose/30 mt-4 divide-y divide-rose/20 overflow-hidden">
              {program.table.map((row, ri) => (
                <div key={ri} className={ri % 2 === 0 ? "bg-white" : "bg-cream/60"}>
                  <div className="px-4 py-3">
                    <p className="text-xs font-bold uppercase tracking-wider text-wine mb-1">Challenge</p>
                    <p className="text-sm text-charcoal font-medium">{row.challenge}</p>
                  </div>
                  <div className="px-4 py-3 border-t border-rose/20">
                    <p className="text-xs font-bold uppercase tracking-wider text-wine mb-1">How Our Program Helps</p>
                    <p className="text-sm text-charcoal-light">{row.help}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="shrink-0 bg-white border-t border-rose/30 px-4 sm:px-6 py-3 sm:py-4 rounded-b-2xl">
          <a href="#contact" onClick={onClose} className="w-full rounded-full bg-wine px-8 py-3 text-base font-heading font-semibold text-white hover:bg-wine-light transition-colors inline-flex items-center justify-center gap-2">
            {program.cta}
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function ProgramsSection() {
  const [selected, setSelected] = useState<Program | null>(null)
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null)
  const programPhotos = programs.map((p) => ({ src: p.image, alt: p.title }))
  const openPhoto = (index: number) => setSelectedPhoto(index)
  const closePhoto = () => setSelectedPhoto(null)
  const navigatePhoto = (index: number) => setSelectedPhoto(index)

  useEffect(() => {
    const lenis = (window as unknown as Window & { lenis?: { stop: () => void; start: () => void } }).lenis
    const locked = selected !== null || selectedPhoto !== null
    if (locked) {
      lenis?.stop()
      document.documentElement.style.overflow = "hidden"
    } else {
      lenis?.start()
      document.documentElement.style.overflow = ""
    }
    return () => {
      if (locked) {
        lenis?.start()
        document.documentElement.style.overflow = ""
      }
    }
  }, [selected, selectedPhoto])

  return (
    <section id="programs" className="px-4 sm:px-6 lg:px-8 pt-8 sm:pt-14 pb-16 sm:pb-24 bg-white relative overflow-hidden">
      <div className="absolute -top-6 -left-6 opacity-10 hidden lg:block">
        <DownwardDog className="w-32 h-32 text-wine" />
      </div>
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4 }}
          className="text-center mb-8 sm:mb-10"
        >
          <span className="text-gold-deep font-semibold text-sm tracking-widest uppercase">Our Programs</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-wine mt-4">Yoga for Every Age & Stage</h2>
          <p className="text-charcoal-light mt-4 max-w-2xl mx-auto">
            From toddlers to seniors, we have programs designed to meet you where you are.{" "}
            <span className="block">Each class builds focus, calm, and confidence.</span>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((p, i) => {
            const cardChallenges = p.cardChallenges ?? p.challenges.slice(0, 10)
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(107, 29, 58, 0.1)" }}
                className="group rounded-2xl bg-white overflow-hidden shadow-sm border border-rose/30 transition-all duration-300 flex flex-col"
              >
              <button
                type="button"
                onClick={() => openPhoto(i)}
                aria-label={`View photo: ${p.title}`}
                className="relative h-44 overflow-hidden block w-full group/photo cursor-pointer p-0 text-left"
              >
                <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-wine-deep/50 to-transparent" />
                <span className="absolute top-4 left-4 text-sm font-semibold text-white bg-wine/80 backdrop-blur-sm rounded-full px-3 py-1">{p.ages}</span>
                <ZoomOverlay />
              </button>

              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold font-heading text-wine mb-2">{p.title}</h3>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-3 text-sm text-gold-deep font-semibold">
                  <span className="inline-flex items-center gap-1.5">
                    <Users className="h-4 w-4 shrink-0" />
                    {p.ages}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-4 w-4 shrink-0" />
                    {p.levels}
                  </span>
                </div>
                <p className="text-base text-charcoal-light italic font-accent leading-relaxed mb-4 min-h-[3.25rem]">{p.tagline}</p>

                <div className="mb-4">
                  <p className="text-sm font-semibold text-wine uppercase tracking-wider mb-2">Challenges</p>
                  <ul className="space-y-1.5">
                    {cardChallenges.map((c, ci) => (
                      <li key={ci} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-gold shrink-0" />
                        <span className="text-xs text-charcoal-light whitespace-nowrap overflow-hidden text-ellipsis">{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => setSelected(p)}
                  className="mt-auto w-full rounded-full bg-wine px-5 py-3 text-base font-heading font-semibold text-white hover:bg-wine-light transition-colors inline-flex items-center justify-center gap-1.5"
                >
                  View Details
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
            )
          })}
        </div>
      </div>

      <AnimatePresence>
        {selected && <ProgramModal program={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>

      <PhotoLightbox photos={programPhotos} selected={selectedPhoto} onClose={closePhoto} onNavigate={navigatePhoto} />
    </section>
  )
}
