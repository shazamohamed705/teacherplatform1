export const portfolioItems = [
  { image: '/1B.png',             title: 'Brand Campaign',     tag: 'Branding',           platform: 'instagram' },
  { image: '/2B.png',             title: 'Medical Content',    tag: 'Content Design',     platform: 'instagram' },
  { image: '/3B.png',             title: 'Social Media Post',  tag: 'Social Media',       platform: 'instagram' },
  { image: '/4A.png',             title: 'Video Production',   tag: 'Video',              platform: 'youtube'   },
  { image: '/4B.png',             title: 'Doctor Brand',       tag: 'Branding',           platform: 'instagram' },
  { image: '/5.png',              title: 'Creative Visual',    tag: 'Creative Direction', platform: 'tiktok'    },
  { image: '/6_01.png',           title: 'Medical Series',     tag: 'Content Design',     platform: 'instagram' },
  { image: '/6_02.png',           title: 'Brand Identity',     tag: 'Brand Identity',     platform: 'instagram' },
  { image: '/6_03 (1).png',       title: 'Visual Design',      tag: 'Design',             platform: 'instagram' },
  { image: '/6_03.png',           title: 'Social Campaign',    tag: 'Social Media',       platform: 'instagram' },
  { image: '/6_04.png',           title: 'Medical Awareness',  tag: 'Content Design',     platform: 'youtube'   },
  { image: '/6_05.png',           title: 'Clinic Branding',    tag: 'Branding',           platform: 'instagram' },
  { image: '/6_06 (1).png',       title: 'Health Campaign',    tag: 'Social Media',       platform: 'tiktok'    },
  { image: '/6_06.png',           title: 'Digital Marketing',  tag: 'Marketing',          platform: 'instagram' },
  { image: '/7A_01.png',          title: 'Doctor Content',     tag: 'Video',              platform: 'youtube'   },
  { image: '/7A_03.png',          title: 'Medical Reels',      tag: 'Video',              platform: 'tiktok'    },
  { image: '/7A_05.png',          title: 'Health Education',   tag: 'Content Design',     platform: 'youtube'   },
  { image: '/7B.png',             title: 'Video Series',       tag: 'Video Production',   platform: 'youtube'   },
  { image: '/8A.png',             title: 'Personal Brand',     tag: 'Branding',           platform: 'instagram' },
  { image: '/8B.png',             title: 'Creative Direction', tag: 'Creative Direction', platform: 'tiktok'    },
  { image: '/9A.png',             title: 'Medical Podcast',    tag: 'Content Design',     platform: 'youtube'   },
  { image: '/9B.png',             title: 'Awareness Campaign', tag: 'Social Media',       platform: 'instagram' },
  { image: '/Carousel-2A_07.png', title: 'Carousel Design',    tag: 'Design',             platform: 'instagram' },
  { image: '/Carousel-2A_06.png', title: 'Carousel Series',    tag: 'Design',             platform: 'instagram' },
  { image: '/Carousel-2A_04.png', title: 'Medical Carousel',   tag: 'Content Design',     platform: 'instagram' },
  { image: '/Carousel-2A_01.png', title: 'Brand Carousel',     tag: 'Branding',           platform: 'instagram' },
  { image: '/Carousel-2A_03.png', title: 'Creative Carousel',  tag: 'Creative Direction', platform: 'instagram' },
];

// Pages of 6 in a fixed editorial rhythm; the last page is padded from the start.
const sizes = ['large', 'small', 'small', 'small', 'large', 'small'];

export const portfolioSets = [];
for (let i = 0; i < portfolioItems.length; i += 6) {
  const chunk = portfolioItems.slice(i, i + 6).map((item, j) => ({ ...item, index: i + j }));
  let pad = 0;
  while (chunk.length < 6) {
    chunk.push({ ...portfolioItems[pad], index: pad });
    pad += 1;
  }
  portfolioSets.push(chunk.map((item, j) => ({ ...item, id: `${i}-${j}`, size: sizes[j] })));
}
