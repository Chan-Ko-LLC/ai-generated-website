import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import styles from './CaseStudies.module.css';

interface CaseStudy {
    id: string;
    title: string;
    description: string;
    extendedDescription: string;
    imageUrl: string;
}

const caseStudies: CaseStudy[] = [
    {
      id: '1',
      title: 'Fractional CTO Engagement',
      description: "Transforming a Computer Vision Startup's Engineering Organization",
      extendedDescription: `
#### Client Overview
Our client, a promising computer vision startup, approached us seeking fractional CTO services to enhance their engineering capabilities and streamline their development processes. The company had a solid product concept but needed expert guidance to scale their engineering operations effectively.

#### Challenges
1. Lack of standardized coding practices.
2. Understaffed engineering team.
3. Inefficient project management.
4. Undocumented engineering processes and practices.

#### Our Approach
We developed a comprehensive strategy to address these challenges:

##### 1. Implementing Coding Standards and Best Practices
- Introduced Google's coding standards to ensure consistency and readability across the codebase.
- Implemented ["Accelerate"](https://itrevolution.com/product/accelerate/) recommended engineering practices, focusing on continuous delivery and lean management principles.

##### 2. Strengthening the Engineering Team
- Recruited and onboarded two senior engineers, bringing valuable expertise and leadership to the team.
- Mentored existing team members to elevate their skills and align with new standards.

##### 3. Enhancing Project Management
- Introduced Kanban methodology to visualize workflow and optimize task management.
- Improved Jira usage, including setting up integrations with GitHub for seamless issue tracking and code review processes.

##### 4. Documenting and Organizing Engineering Practices
- Created comprehensive documentation in Confluence, covering:
  - Engineering practices
  - Design documents
  - Development processes
- Organized information for easy access and updates, fostering knowledge sharing within the team.

#### Results
Our fractional CTO services led to significant improvements in the startup's engineering organization:

1. **Increased Code Quality**: Standardized coding practices resulted in more maintainable and efficient code.
2. **Enhanced Team Productivity**: The addition of senior engineers and improved processes led to faster development cycles and reduced bottlenecks.
3. **Improved Project Visibility**: Kanban and optimized Jira usage provided clearer insights into project status and resource allocation.
4. **Better Knowledge Management**: Comprehensive documentation in Confluence reduced onboarding time for new team members and improved collaboration.

#### Conclusion
Through our fractional CTO services, we successfully transformed the computer vision startup's engineering organization. By implementing industry best practices, strengthening the team, and improving processes, we set the foundation for scalable and efficient software development. This engagement showcases our ability to provide strategic technical leadership and drive tangible improvements in engineering operations.
      `,
      imageUrl: '/images/case-study-1.jpg',
    },
    {
      id: '2',
      title: 'Beta Transformation',
      description: 'Digital transformation for a leading retail chain.',
      extendedDescription: `The Beta Transformation project involved a complete overhaul of a
      national retail chain's digital infrastructure. We implemented a new e-commerce platform,
      modernized in-store technology, and created a seamless omnichannel experience. This resulted
      in a 50% increase in online sales and a 30% improvement in customer satisfaction scores.`,
      imageUrl: '/images/case-study-2.jpg',
    },
    {
      id: '3',
      title: 'Gamma Tech Integration',
      description: 'Seamless integration of cutting-edge technologies.',
      extendedDescription: 'For Gamma Tech, we integrated IoT sensors, blockchain, and machine learning algorithms to create a next-generation supply chain management system. This integration improved inventory accuracy by 99.9%, reduced waste by 35%, and increased overall supply chain efficiency by 28%.',
      imageUrl: '/images/case-study-3.jpg',
    },
  ];

  interface CaseStudyCardProps {
    study: CaseStudy;
    expanded: boolean;
    toggleExpand: (id: string) => void;
  }

  const CaseStudyCard: React.FC<CaseStudyCardProps> = ({ study, expanded, toggleExpand }) => (
    <div className={`${styles.card} ${expanded ? styles.expanded : ''}`}>
      <img
        src={`https://picsum.photos/seed/${study.title}/200/200`}
        alt={study.title}
        className={styles.image}
      />
      <h3 className={styles.studyTitle}>{study.title}</h3>
      <div className={styles.description}>
        {expanded ? (
          <ReactMarkdown>{study.extendedDescription}</ReactMarkdown>
        ) : (
          <p>{study.description}</p>
        )}
      </div>
      <button
        onClick={() => toggleExpand(study.id)}
        className={styles.link}
      >
        {expanded ? 'Read Less' : 'Read More'}
      </button>
    </div>
  );

  interface CaseStudyGridProps {
    studies: CaseStudy[];
    expandedId: string | null;
    toggleExpand: (id: string) => void;
  }

  const CaseStudyGrid: React.FC<CaseStudyGridProps> = ({ studies, expandedId, toggleExpand }) => (
    <div className={styles.grid}>
      {studies.map((study) => (
        <CaseStudyCard
          key={study.id}
          study={study}
          expanded={expandedId === study.id}
          toggleExpand={toggleExpand}
        />
      ))}
    </div>
  );

  const CaseStudies: React.FC = () => {
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const toggleExpand = (id: string) => {
      setExpandedId(expandedId === id ? null : id);
    };

    return (
      <section className={styles.caseStudies}>
        <h2>Case Studies</h2>
        <div className={styles.content}>
          <CaseStudyGrid
            studies={caseStudies}
            expandedId={expandedId}
            toggleExpand={toggleExpand}
          />
        </div>
      </section>
    );
  };

export default CaseStudies;
