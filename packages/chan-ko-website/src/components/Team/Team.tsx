import React from 'react';
import styles from './Team.module.css';

// Import images
import chandraImage from '../../assets/images/chandra-erdman.png';
import kourtniImage from '../../assets/images/kourtni-in-chicago-hoodie.jpg';
import cliffImage from '../../assets/images/cray_podium_20230926.jpg';

interface TeamMember {
  name: string;
  role?: string;
  bio: string;
  image?: string;
}

const principals: TeamMember[] = [
  {
    name: 'Chandra Erdman, PhD',
    bio: `Dr. Erdman stands out as a trailblazer in technology and data science. As Yale's first
    Black PhD recipient in Statistics, she has forged an exceptional path from research
    statistician at the US Census Bureau to technical program manager at Google. Her rare
    combination of government statistical expertise and Silicon Valley leadership has enabled her
    to spearhead transformative initiatives impacting billions of users. Dr. Erdman's unparalleled
    blend of skills in data analytics, security, and fostering diversity positions her as a
    groundbreaking advisor in technology and innovation, offering insights few others can match.`,
    image: chandraImage,
  },
  {
    name: 'Kourtni Marshall',
    bio: `Kourtni is a visionary technology leader with over 15 years of experience, including a
    decade at Google as a Software Engineer Tech Lead. As a former CTO and co-founder, he combines
    deep technical expertise with a passion for empowering entrepreneurs and nonprofits. Kourtni's
    diverse background spans software development, education, and entertainment, making him uniquely
    qualified to guide organizations in leveraging technology for social impact and business
    success.`,
    image: kourtniImage,
  },
];

const teamMembers: TeamMember[] = [
  {
    name: 'Clifford Rallins',
    role: 'EdTech Evangelist',
    bio: `Having served as IT Director at a charter school network for over 18 years, Cliff has seen
    it all when it comes to educational technology. His diverse background in IT management and
    ability to bring technology to educational settings make him an ideal guide for institutions
    hoping to leverage technology to enhance learning outcomes.`,
    image: cliffImage,
  },
  {
    name: 'Jason Williamson, MBA',
    role: 'Sales Lead',
    bio: `Jason brings 15+ years of experience in sales and business development across
    pharmaceuticals, real estate, and technology. He has a proven track record of driving revenue
    growth and building strong client relationships.`,
  },
  {
    name: 'John Smith',
    role: 'AI/ML Consulting',
    bio: 'John is an expert in AI and machine learning technologies.',
  },
  {
    name: 'Alice Johnson',
    role: 'Creative Director',
    bio: 'Alice brings 15 years of experience in content creation and strategy.',
  },
  {
    name: 'Bob Williams',
    role: 'Head of Business Development',
    bio: 'Bob excels at identifying new opportunities and partnerships.',
  },
  {
    name: 'Isa Confetti',
    role: 'Motion Picture Consulting',
    bio: 'Isa is an expert in film production and set design.',
  },
  {
    name: 'Alicia Johns',
    role: 'Director of Ducks',
    bio: 'Alicia knows a lot about what ducks like.',
  },
  {
    name: 'William Evans',
    role: 'Prompt Engineer',
    bio: 'William is usually very prompt.',
  },
];

const TeamMemberCard: React.FC<TeamMember> = ({name, role, bio, image}) => (
  <div className={styles.teamMember}>
    <div className={styles.imageContainer}>
      <img
        src={image || `https://picsum.photos/seed/${name}/200/200`}
        alt={name}
        className={styles.memberImage}
      />
    </div>
    <h3>{name}</h3>
    <p className={styles.role}>{role}</p>
    <p className={styles.bio}>{bio}</p>
  </div>
);

const TeamSection: React.FC<{title: string; members: TeamMember[]}> = ({title, members}) => (
  <>
    <h2>{title}</h2>
    <div className={styles.teamGrid}>
      {members.map((member, index) => (
        <TeamMemberCard key={index} {...member} />
      ))}
    </div>
  </>
);

const Team: React.FC = () => {
  return (
    <section className={styles.team}>
      <TeamSection title="Principals" members={principals} />
      <TeamSection title="Our Team" members={teamMembers} />
    </section>
  );
};

export default Team;
