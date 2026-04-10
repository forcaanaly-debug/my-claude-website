import Image from 'next/image'

interface GalleryImage {
  id: string
  src: string
  alt: string
  destination: string
}

interface Props {
  images: GalleryImage[]
}

export default function GalleryGrid({ images }: Props) {
  return (
    <section style={{ background: 'var(--color-offwhite)' }} className="section-padding">
      <div className="container-wide">
        <div style={{
          columns: '1',
          columnGap: '1rem',
          WebkitColumns: '1',
        }}
        className="gallery-columns"
        >
          {images.map((img) => (
            <div
              key={img.id}
              style={{
                breakInside: 'avoid',
                marginBottom: '1rem',
                position: 'relative',
                overflow: 'hidden',
                background: 'var(--color-sand)',
                display: 'block',
              }}
              className="gallery-item"
            >
              <div style={{ position: 'relative', width: '100%', paddingTop: parseInt(img.id) % 3 === 0 ? '133%' : parseInt(img.id) % 2 === 0 ? '75%' : '100%' }}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  style={{
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                  }}
                  className="gallery-img"
                />
                {/* Overlay on hover */}
                <div className="gallery-overlay" style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(15,15,15,0.5)',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '1.25rem',
                }}>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.6rem',
                    fontWeight: 500,
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color: 'var(--color-bronze-pale)',
                    marginBottom: '0.25rem',
                  }}>
                    {img.destination}
                  </p>
                  <p style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.95rem',
                    fontStyle: 'italic',
                    color: 'var(--color-offwhite)',
                  }}>
                    {img.alt}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .gallery-columns {
          columns: 2;
          column-gap: 1rem;
        }
        @media (min-width: 768px) {
          .gallery-columns { columns: 3; }
        }
        @media (min-width: 1200px) {
          .gallery-columns { columns: 4; }
        }
        .gallery-item:hover .gallery-img {
          transform: scale(1.04);
        }
        .gallery-item:hover .gallery-overlay {
          opacity: 1 !important;
        }
      `}</style>
    </section>
  )
}
