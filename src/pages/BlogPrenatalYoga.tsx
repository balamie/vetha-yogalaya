import { BlogPost } from "../components/BlogPost"
import { Seo } from "../components/Seo"

export function BlogPrenatalYoga() {
  return (
    <BlogPost
      title="Yoga During Pregnancy: A Complete Guide for Expecting Mothers"
      date="May 2026"
      author="Vetha Yogalaya Team"
      readTime="8 min read"
      image="/blog/blog-3.webp"
    >
      <Seo
        title="Yoga During Pregnancy: A Complete Guide | Vetha Yogalaya"
        description="Safe poses, breathing techniques, and the benefits of prenatal yoga for a calm pregnancy and smoother delivery."
        path="/blog/prenatal-yoga-guide"
      />
      <p>
        Pregnancy is a time of profound physical and emotional change. Yoga, when practiced safely with appropriate modifications, can support expectant mothers through each trimester. This guide summarizes what current scientific research tells us about prenatal yoga — its benefits, safety considerations, and practical guidelines.
      </p>

      <h3 className="text-lg font-bold font-heading text-wine mt-8 mb-3">Is Yoga Safe During Pregnancy?</h3>
      <p>
        The American College of Obstetricians and Gynecologists (ACOG) recommends that pregnant women engage in 150 minutes of moderate-intensity aerobic activity per week, and identifies yoga as a safe form of exercise during pregnancy for women with uncomplicated pregnancies (ACOG, 2020, <em>Obstetrics & Gynecology</em>). However, certain poses and practices should be modified or avoided, particularly after the first trimester. It is recommended that pregnant women consult their healthcare provider before starting any new exercise program, including prenatal yoga.
      </p>

      <h3 className="text-lg font-bold font-heading text-wine mt-8 mb-3">Reducing Anxiety and Depression</h3>
      <p>
        Perinatal anxiety and depression affect approximately 15–20% of pregnant women. A systematic review and meta-analysis of 13 randomized controlled trials found that prenatal yoga significantly reduced anxiety and depressive symptoms compared to standard prenatal care alone (Gong et al., 2015, <em>Complementary Therapies in Clinical Practice</em>). A separate randomized trial involving 60 pregnant women found that 12 weeks of prenatal yoga reduced perceived stress and improved quality of life scores (Rakhshani et al., 2012, <em>Journal of Obstetrics and Gynaecology Research</em>).
      </p>

      <h3 className="text-lg font-bold font-heading text-wine mt-8 mb-3">Improving Birth Outcomes</h3>
      <p>
        A meta-analysis of 10 randomized controlled trials involving over 1,000 participants found that prenatal yoga was associated with reduced rates of preterm labour, lower incidence of pregnancy-induced hypertension, and higher rates of vaginal delivery (Jiang et al., 2015, <em>Journal of Obstetrics and Gynaecology Research</em>). While the authors noted that more high-quality trials are needed, the evidence suggests potential benefits for both maternal and neonatal outcomes.
      </p>

      <h3 className="text-lg font-bold font-heading text-wine mt-8 mb-3">Managing Pregnancy Discomfort</h3>
      <p>
        Common pregnancy discomforts — lower back pain, pelvic pressure, fatigue — can be alleviated by appropriate yoga practice. A randomized trial found that prenatal yoga significantly reduced low back pain and improved physical function compared to a control group receiving standard prenatal care (Martins & Pinto e Silva, 2014, <em>Revista Brasileira de Ginecologia e Obstetricia</em>). Gentle stretching, strengthening of the pelvic floor, and improved posture awareness contribute to these benefits.
      </p>

      <h3 className="text-lg font-bold font-heading text-wine mt-8 mb-3">Postnatal Recovery</h3>
      <p>
        Research also supports the benefits of postnatal yoga. A study of 90 postpartum women found that a 6-week yoga program improved mood and reduced symptoms of postpartum depression (Buttner et al., 2015, <em>Journal of Obstetric, Gynecologic & Neonatal Nursing</em>). Gentle yoga after delivery — with appropriate modifications — can aid recovery of core strength, pelvic floor function, and emotional well-being.
      </p>

      <h3 className="text-lg font-bold font-heading text-wine mt-8 mb-3">Safety Guidelines for Prenatal Yoga</h3>
      <ul className="list-disc pl-6 space-y-2">
        <li><strong>Consult your healthcare provider</strong> before beginning any exercise program during pregnancy.</li>
        <li><strong>Avoid deep twists,</strong> inverted poses, and lying flat on your back after the first trimester.</li>
        <li><strong>Focus on gentle stretching,</strong> breathing exercises, and modified standing poses.</li>
        <li><strong>Stay hydrated</strong> and avoid overheating during practice.</li>
        <li><strong>Use props</strong> (blocks, bolsters, straps) to support your changing body.</li>
        <li><strong>Listen to your body</strong> — modify or skip any pose that feels uncomfortable.</li>
      </ul>

      <h3 className="text-lg font-bold font-heading text-wine mt-8 mb-3">What the Research Does Not Yet Tell Us</h3>
      <p>
        While the existing evidence is encouraging, many studies have small sample sizes and varying protocols, making it difficult to draw definitive conclusions. Larger, well-designed randomized controlled trials are needed to confirm these findings and establish optimal practice guidelines. For now, prenatal yoga is considered safe for uncomplicated pregnancies when practiced under the guidance of a qualified instructor who understands the specific needs of pregnant women.
      </p>

      <hr className="my-6 border-rose/30" />
      <p className="text-xs text-charcoal-light/60">
        <strong>References:</strong><br />
        ACOG (2020). <em>Obstetrics & Gynecology</em>, 135(4), e178–e188.<br />
        Gong, H., et al. (2015). <em>Complementary Therapies in Clinical Practice</em>, 21(4), 230–237.<br />
        Rakhshani, A., et al. (2012). <em>Journal of Obstetrics and Gynaecology Research</em>, 38(6), 906–912.<br />
        Jiang, Q., et al. (2015). <em>Journal of Obstetrics and Gynaecology Research</em>, 41(9), 1344–1350.<br />
        Martins, R. F., & Pinto e Silva, J. L. (2014). <em>Revista Brasileira de Ginecologia e Obstetricia</em>, 36(8), 346–351.<br />
        Buttner, M. M., et al. (2015). <em>Journal of Obstetric, Gynecologic & Neonatal Nursing</em>, 44(2), 249–257.
      </p>
    </BlogPost>
  )
}
