import { useEffect, useRef, useState } from "react";
import "./App.css";

const photos = ["doi1.jpeg", "doi2.jpeg", "doi3.jpeg"];

const zodiacSigns = [
  { symbol: "♈", name: "Aries" },
  { symbol: "♉", name: "Taurus" },
  { symbol: "♊", name: "Gemini" },
  { symbol: "♋", name: "Cancer" },
  { symbol: "♌", name: "Leo" },
  { symbol: "♍", name: "Virgo" },
  { symbol: "♎", name: "Libra" },
  { symbol: "♏", name: "Scorpio" },
  { symbol: "♐", name: "Sagittarius" },
  { symbol: "♑", name: "Capricorn" },
  { symbol: "♒", name: "Aquarius" },
  { symbol: "♓", name: "Pisces" },
];

function Sky() {
  const stars = Array.from({ length: 55 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: `${Math.random() * 2.5 + 1}px`,
    delay: `${Math.random() * 5}s`,
    duration: `${Math.random() * 4 + 3}s`,
  }));

  return (
    <div className="sky" aria-hidden="true">
      {stars.map((star) => (
        <span
          key={star.id}
          className="star"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            animationDelay: star.delay,
            animationDuration: star.duration,
          }}
        />
      ))}
    </div>
  );
}

function FloatingWords() {
  const words = ["hope", "dream", "breathe", "believe", "tomorrow"];

  return (
    <div className="floating-words" aria-hidden="true">
      {words.map((word, index) => (
        <span key={word} className={`floating-word word-${index + 1}`}>
          {word}
        </span>
      ))}
    </div>
  );
}

function ZodiacBackground() {
  return (
    <div className="zodiac-background" aria-hidden="true">
      {zodiacSigns.map((zodiac, index) => (
        <div
          key={zodiac.name}
          className={`zodiac zodiac-${index + 1}`}
        >
          <span>{zodiac.symbol}</span>
          <small>{zodiac.name}</small>
        </div>
      ))}
    </div>
  );
}

/* =========================
   FOTO ROLLER
========================= */

function PhotoRoller({ photos, activePhoto }) {
  return (
    <div className="photo-roller">
      <div
        className="photo-roller-track"
        style={{
          transform: `translateY(-${activePhoto * 100}%)`,
        }}
      >
        {photos.map((photo, index) => (
          <div className="roller-photo" key={photo}>
            <img
              src={`${import.meta.env.BASE_URL}${photo}`}
              alt={`Memory ${index + 1}`}
            />

            <div className="roller-gradient" />

            <div className="roller-info">
              <span>MEMORY</span>
              <strong>0{index + 1}</strong>
            </div>
          </div>
        ))}
      </div>

      <div className="roller-frame" />
    </div>
  );
}

/* =========================
   NAILONG CINEMA
========================= */

function NailongCinema() {
  return (
    <div className="cinema-wrap">
      <div className="ticket">
        <div className="ticket-left">
          <div className="ticket-label">A LITTLE CINEMA</div>

          <h3>
            Something
            <br />
            to make you smile.
          </h3>

          <p>
            No matter how the day goes,
            <br />
            I hope this little guy helps.
          </p>

          <div className="ticket-code">ALIA — 2026</div>
        </div>

        <div className="ticket-divider">
          <span />
          <span />
        </div>

        <div className="ticket-right">
          <div className="ticket-small">NOW PLAYING</div>

          <div className="video-frame">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              src={`${import.meta.env.BASE_URL}nailong.mp4`}
            />
          </div>

          <div className="ticket-name">NAILONG</div>
        </div>
      </div>
    </div>
  );
}

/* =========================
   APP
========================= */

function App() {
  const [started, setStarted] = useState(false);
  const [activePhoto, setActivePhoto] = useState(0);
  const [showLetter, setShowLetter] = useState(false);

  const audioRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setActivePhoto((prev) => (prev + 1) % photos.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  const start = async () => {
    setStarted(true);

    if (audioRef.current) {
      audioRef.current.volume = 0.38;

      try {
        await audioRef.current.play();
      } catch (error) {
        console.log("Audio autoplay blocked:", error);
      }
    }
  };

  return (
    <main className="site">
      <audio
        ref={audioRef}
        loop
        src={`${import.meta.env.BASE_URL}music.mp3`}
      />

      <Sky />
      <FloatingWords />

      {/* =========================
          OPENING
      ========================= */}

      <section className={`opening ${started ? "opening-hidden" : ""}`}>
        <div className="opening-content">
          <div className="opening-time">11:47 PM</div>

          <div className="opening-line" />

          <p className="opening-small">A LITTLE NOTE FOR</p>

          <h1>
            Hey,
            <br />
            <em>Alia.</em>
          </h1>

          <p className="opening-description">
            I wrote something for you.
            <br />
            Nothing complicated.
            <br />
            Just a little reminder.
          </p>

          <button className="open-button" onClick={start}>
            <span>Open the letter</span>
            <span className="button-arrow">→</span>
          </button>
        </div>

        <div className="opening-footer">
          <span>FOR ALL THE DAYS AHEAD</span>
          <span>SCROLL TO BEGIN</span>
        </div>
      </section>

      {/* =========================
          HERO
      ========================= */}

      <section className="hero section">
        <div className="hero-inner">
          <div className="eyebrow">A LETTER FOR ALIA</div>

          <h2>
            You don't have to know
            <br />
            <em>everything</em> yet.
          </h2>

          <div className="hero-bottom">
            <p>
              Aku nggak tahu masa depan akan seperti apa.
              <br />
              Tapi aku percaya, akan ada banyak hal indah
              <br />
              yang pelan-pelan datang ke hidupmu.
            </p>

            <div className="scroll-indicator">
              <span>01</span>
              <div />
              <span>KEEP GOING</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          TODAY
      ========================= */}

      <section className="today section">
        <div className="section-number">01 / 05</div>

        <div className="today-content">
          <p className="eyebrow">TODAY</p>

          <h2>
            Kalau hari ini
            <br />
            terasa berat,
          </h2>

          <p className="large-copy">
            istirahat sebentar.
            <br />
            Nggak apa-apa.
          </p>

          <p className="body-copy">
            Kamu nggak harus selalu kuat.
            <br />
            Kamu nggak harus selalu punya jawaban.
            <br />
            Kadang, cukup bertahan sampai besok.
          </p>
        </div>
      </section>

      {/* =========================
          MEMORIES
      ========================= */}

      <section className="memories section">
        <div className="memories-heading">
          <div>
            <p className="eyebrow">SOME MOMENTS</p>

            <h2>
              stay.
              <br />
              <em>always.</em>
            </h2>
          </div>

          <p className="memories-note">
            Beberapa hal mungkin
            <br />
            sederhana.
            <br />
            Tapi tetap berarti.
          </p>
        </div>

        <PhotoRoller
          photos={photos}
          activePhoto={activePhoto}
        />

        <div className="photo-controls">
          {photos.map((_, index) => (
            <button
              key={index}
              className={activePhoto === index ? "active" : ""}
              onClick={() => setActivePhoto(index)}
              aria-label={`Show memory ${index + 1}`}
            >
              0{index + 1}
            </button>
          ))}
        </div>
      </section>

      {/* =========================
          TOMORROW
      ========================= */}

      <section className="tomorrow section">
        <ZodiacBackground />

        <div className="section-number">02 / 05</div>

        <div className="tomorrow-top">
          <p className="eyebrow">TOMORROW</p>

          <h2>
            Aku percaya ada
            <br />
            sesuatu yang <em>indah</em>
            <br />
            menunggumu.
          </h2>
        </div>

        <div className="timeline">
          <div className="timeline-item">
            <span>YESTERDAY</span>

            <div className="timeline-line" />

            <p>
              Hal-hal yang sudah lewat
              <br />
              boleh kamu tinggalkan.
            </p>
          </div>

          <div className="timeline-item current">
            <span>TODAY</span>

            <div className="timeline-line" />

            <p>
              Jalani pelan-pelan.
              <br />
              Kamu sedang bertumbuh.
            </p>
          </div>

          <div className="timeline-item">
            <span>TOMORROW</span>

            <div className="timeline-line" />

            <p>
              Masih banyak cerita
              <br />
              yang belum kamu temui.
            </p>
          </div>
        </div>
      </section>

      {/* =========================
          WISHES
      ========================= */}

      <section className="wishes section">
        <div className="section-number">03 / 05</div>

        <div className="wishes-header">
          <p className="eyebrow">A FEW WISHES</p>

          <h2>
            Three things
            <br />
            I wish <em>for you.</em>
          </h2>
        </div>

        <div className="wish-grid">
          <article className="wish-card">
            <span>01</span>

            <h3>Peace</h3>

            <p>
              Semoga hati kamu
              <br />
              lebih sering tenang
              <br />
              daripada gelisah.
            </p>
          </article>

          <article className="wish-card">
            <span>02</span>

            <h3>Courage</h3>

            <p>
              Semoga kamu punya
              <br />
              keberanian untuk
              <br />
              memilih dirimu sendiri.
            </p>
          </article>

          <article className="wish-card">
            <span>03</span>

            <h3>Your dreams</h3>

            <p>
              Semoga satu per satu
              <br />
              hal yang kamu doakan
              <br />
              menemukan jalannya.
            </p>
          </article>
        </div>
      </section>

      {/* =========================
          CINEMA
      ========================= */}

      <section className="cinema section">
        <div className="section-number">04 / 05</div>

        <div className="cinema-heading">
          <p className="eyebrow">YOUR LITTLE CINEMA</p>

          <h2>
            A tiny reason
            <br />
            to <em>smile.</em>
          </h2>
        </div>

        <NailongCinema />
      </section>

      {/* =========================
          CONSTELLATION
      ========================= */}

      <section className="constellation section">
        <div className="section-number">05 / 05</div>

        <div className="constellation-content">
          <p className="eyebrow">MAKE A WISH</p>

          <h2>
            Keep looking
            <br />
            <em>forward.</em>
          </h2>

          <p className="constellation-copy">
            Ada banyak hal yang belum kamu lihat.
            <br />
            Banyak tempat yang belum kamu datangi.
            <br />
            Banyak versi dirimu yang belum kamu kenal.
          </p>
        </div>

        <div className="stars-map">
          <span className="constellation-star star-a">✦</span>
          <span className="constellation-star star-b">✦</span>
          <span className="constellation-star star-c">✦</span>
          <span className="constellation-star star-d">✦</span>
          <span className="constellation-star star-e">✦</span>
          <span className="constellation-star star-f">✦</span>

          <svg
            viewBox="0 0 700 400"
            className="constellation-lines"
          >
            <path d="M80 290 L190 170 L310 250 L440 100 L570 190 L650 70" />
            <path d="M190 170 L250 70" />
            <path d="M310 250 L390 340" />
          </svg>
        </div>
      </section>

      {/* =========================
          PRAYER
      ========================= */}

      <section className="prayer section">
        <div className="prayer-paper">
          <p className="eyebrow">A QUIET PRAYER</p>

          <h2>
            I hope you get
            <br />
            everything you
            <br />
            <em>pray for.</em>
          </h2>

          <div className="prayer-line" />

          <p className="prayer-copy">
            Semoga kamu menemukan tempat
            <br />
            yang membuatmu merasa cukup.
            <br />
            Orang-orang yang membuatmu merasa aman.
            <br />
            Dan kehidupan yang membuatmu
            <br />
            bangun setiap pagi dengan senyum.
          </p>
        </div>
      </section>

      {/* =========================
          ENDING
      ========================= */}

      <section className="ending section">
        <div className="ending-inner">
          <p className="eyebrow">ONE LAST THING</p>

          <h2>
            Your story
            <br />
            isn't <em>over.</em>
          </h2>

          <p className="ending-copy">
            Ini baru sebagian kecil dari perjalananmu.
            <br />
            Jadi, please...
            <br />
            keep going.
          </p>

          <div className="signature">
            <span>with love,</span>
            <strong>Agil Pamungkas</strong>
          </div>

          <button
            className="letter-button"
            onClick={() => setShowLetter(true)}
          >
            Read one last letter
            <span>→</span>
          </button>
        </div>

        <div className="ending-footer">
          <span>FOR ALIA</span>
          <span>∞</span>
          <span>FOR ALL THE DAYS AHEAD</span>
        </div>
      </section>

      {/* =========================
          LETTER MODAL
      ========================= */}

      {showLetter && (
        <div className="letter-modal">
          <button
            className="close-letter"
            onClick={() => setShowLetter(false)}
          >
            ×
          </button>

          <div className="letter-content">
            <p className="letter-date">SOMEWHERE IN TIME</p>

            <h2>
              Alia,
              <br />
              keep going.
            </h2>

            <div className="letter-body">
              <p>
                Kalau suatu hari nanti kamu membaca ini
                lagi dan kamu sedang merasa capek,
                semoga kamu ingat satu hal:
              </p>

              <p>
                kamu sudah melewati banyak hal
                yang dulu kamu kira nggak akan bisa
                kamu lewati.
              </p>

              <p>
                Jadi jangan terlalu keras sama diri
                sendiri.
              </p>

              <p>
                Jalanmu mungkin nggak selalu lurus.
                Kadang mungkin lambat.
                Kadang bahkan terasa seperti mundur.
              </p>

              <p>
                Tapi itu nggak berarti kamu gagal.
              </p>

              <p>
                Kamu tetap berjalan.
                Dan itu sudah cukup.
              </p>

              <p>
                Aku harap nanti,
                ketika kamu melihat kembali
                semua yang sudah kamu lewati,
                kamu bisa tersenyum dan berkata:
              </p>

              <blockquote>
                “Ternyata aku berhasil sampai sejauh ini.”
              </blockquote>

              <p>
                Sampai saat itu datang,
                jaga dirimu baik-baik ya.
              </p>

              <p>
                And please remember —
                there are still beautiful days ahead.
              </p>
            </div>

            <div className="letter-signature">
              <span>always cheering for you,</span>
              <strong>Agil</strong>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default App;