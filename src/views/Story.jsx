import curveLine from "@/assets/images/curve-line.webp";
import login4 from "@/assets/images/login-4.webp";
import graphic3 from "@/assets/images/graphic-3.webp";
import graphic4 from "@/assets/images/graphic-4.webp";
import graphic5 from "@/assets/images/graphic-5.webp";
import login1 from "@/assets/images/login-1.webp";
import login3 from "@/assets/images/login-3.webp";
import login5 from "@/assets/images/login-5.webp";
import login10 from "@/assets/images/login-10.webp";
import login8 from "@/assets/images/login-8.webp";
import login11 from "@/assets/images/login-11.webp";
import login7 from "@/assets/images/login-7.webp";

const Story = () => {
  return (
    <>
      <main className="position-relative overflow-hidden">
        {/* 背景素材 */}
        <img
          src={curveLine}
          alt=""
          className="position-absolute z-n1 curve-line"
        />

        {/* section 1 生活小確幸 */}
        <section className="container py-lg-18 py-8 px-lg-0 position-relative">
          <div className="d-lg-flex flex-column justify-content-center">
            {/* title */}
            <div className="d-lg-flex mb-4 mb-lg-6">
              <h4 className="fs-lg-2 fs-4 fw-bold text-neutral-100">
                每一口甜甜，
              </h4>
              <h4 className="fs-lg-2 fs-4 fw-bold text-neutral-100">
                都是<span className="text-primary-40">生活的小確幸</span>。
              </h4>
            </div>
            <p className="text-neutral-60 fs-7 fs-lg-9 mb-6 mb-lg-10">
              幸福藏在每個靜謐的午後，Tenten Panda 輕輕守候。
            </p>
            {/* 照片 */}
            <div className="w-100">
              <div className="img-col br-40 br-lg-56 overflow-hidden">
                <img
                  src={login4}
                  alt=""
                  className="story-img object-fit-cover w-100 h-100"
                />
              </div>
            </div>
          </div>
        </section>

        {/*  section 2 日常溫暖陪伴 */}
        <section className="container d-lg-flex justify-content-center py-lg-16 py-10 text-neutral-100 fw-bold fs-4 fs-lg-2 position-relative">
          {/* 背景素材 */}
          <img
            src={graphic3}
            alt=""
            className="graphic-3 position-absolute z-n1 d-none d-lg-block"
          />
          <p className="">TenTen是甜甜、也是天天，</p>
          <p>
            象徵<span className="text-primary-40">日常的溫暖陪伴</span>。
          </p>
        </section>

        {/*  section 3 熊貓懂得慢，甜甜圈懂得安慰 */}
        <section className="container py-8 px-lg-0 d-lg-flex justify-content-between align-items-center py-lg-8 position-relative">
          {/* 背景素材 */}
          <img
            src={graphic4}
            alt=""
            className="graphic-4 position-absolute z-n1 d-lg-none d-block"
          />
          {/* s3 介紹文 */}
          <div className="w-100">
            {/* title */}
            <h4 className="fs-lg-3 fs-6 fw-bold text-neutral-100 mb-3 mb-lg-6">
              熊貓懂得慢，甜甜圈懂得安慰
            </h4>
            <ul className="text-neutral-80 fs-9 fs-lg-5 mb-3 mb-lg-6">
              <li className="lh-base">對 TenTenPanda 來說，</li>
              <li className="lh-base">不為潮流奔波，</li>
              <li className="lh-base">只想用一點柔軟，</li>
              <li className="lh-base">安放你每一個渴望被療癒的日常。</li>
              <li className="lh-base">如同一隻靜靜坐著的熊貓，</li>
              <li className="lh-base">不疾不徐，</li>
              <li className="lh-base">帶著圓潤與可愛，</li>
            </ul>
            <p className="text-primary-80 fs-6 fs-lg-4 mb-4">
              陪你走過那些無需言明的日子。
            </p>
          </div>
          {/* 照片 */}
          <div className="d-flex w-100">
            {/* 左圖 */}
            <div className="w-50 pe-3 pt-18 pt-lg-30">
              <div className="team-panda br-40 br-lg-56 overflow-hidden">
                <img
                  src={login1}
                  alt=""
                  className="object-fit-cover w-100 h-100"
                />
              </div>
            </div>
            {/* 右圖 */}
            <div className="w-50 ps-3 pt-6 pt-lg-8">
              <div className="single-panda br-40 br-lg-56 overflow-hidden">
                <img
                  src={login3}
                  alt=""
                  className="object-fit-cover w-100 h-100"
                />
              </div>
            </div>
          </div>
        </section>

        {/*  section 4 每一口講究 */}
        <section className="py-8 pt-lg-8 px-lg-0 d-lg-flex flex-row-reverse position-relative">
          {/* 背景素材 */}
          <img
            src={graphic4}
            alt=""
            className="s4-graphic-4 position-absolute z-n1 d-lg-block d-none"
          />
          {/* s4 介紹文 */}
          <div className="px-3 s4-intro w-100 px-lg-0 align-self-end">
            <h5 className="fs-5 fs-lg-3 fw-bold mb-3 mb-lg-6">每一口的講究</h5>
            <ul className="text-neutral-80 fs-9 fs-lg-5 mb-8 mb-lg-0">
              <li className="lh-base mb-5 mb-lg-6">
                我們堅持使用天然食材製作，
                <br />
                從日本進口小麥粉到香氣濃郁的鮮奶油，
              </li>
              <li className="lh-base mb-5 mb-lg-6">
                每一顆甜甜圈皆低溫發酵製成，
                <br />
                口感外酥內軟，甜而不膩。
              </li>
              <li className="lh-base mb-3 mb-lg-6">
                包裝與甜甜圈設計也以「陪伴感」為核心，
              </li>
              <li className="lh-base text-primary-80 fs-6 fs-lg-4">
                不只是一份甜點，更是一份情緒的安放。
              </li>
            </ul>
          </div>
          {/* 照片 */}
          <div className="s4-img px-3 ps-lg-0 w-100 me-lg-6 pb-lg-30">
            <div className="s4-img-col br-40 br-lg-56 br-tl-lg-0 br-bl-lg-0 overflow-hidden">
              <img
                src={login5}
                alt=""
                className="object-fit-cover w-100 h-100"
              />
            </div>
          </div>
        </section>

        {/* section 5 想陪你一起的未來 */}
        <section className="container py-lg-18 px-lg-0 pt-16 mb-lg-30 pb-30 position-relative">
          {/* 背景素材 */}
          <img
            src={graphic5}
            alt=""
            className="graphic-5 position-absolute z-n1"
          />
          {/* s3 介紹文 */}
          <div className="w-100">
            {/* title */}
            <h4 className="fs-lg-3 fs-6 fw-bold text-neutral-100 mb-3 mb-lg-6">
              想陪你一起的未來
            </h4>
            <ul className="text-neutral-80 fs-9 fs-lg-5 mb-3 mb-lg-6">
              <li className="lh-base">TenTenPanda 不只是賣甜甜圈的品牌，</li>
              <li className="lh-base">而是一份「剛剛好的溫暖」。</li>
              <li className="lh-base">
                當你累了、孤單了，或只是想靜靜地喘口氣，
              </li>
              <li className="lh-base">我們都在，靜靜守候。</li>
              <li className="lh-base">就像那一口外酥內軟的甜甜圈⋯⋯</li>
            </ul>
            <p className="text-primary-80 fs-6 fs-lg-4">
              小小的，卻剛好填補生活裡那些無聲的空白。
            </p>
          </div>
        </section>

        {/* section 6 底部照片 */}
        <section>
          <div className="s6-imgs w-100 d-flex">
            <div className="col-3">
              <img
                src={login10}
                alt=""
                className="object-fit-cover w-100 h-100"
              />
            </div>
            <div className="col-3">
              <img
                src={login8}
                alt=""
                className="object-fit-cover w-100 h-100"
              />
            </div>
            <div className="col-3">
              <img
                src={login11}
                alt=""
                className="object-fit-cover w-100 h-100"
              />
            </div>
            <div className="col-3">
              <img
                src={login7}
                alt=""
                className="object-fit-cover w-100 h-100"
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Story;
