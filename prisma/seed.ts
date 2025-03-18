import { PrismaClient, PostStatus, CourseStatus } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create admin user if not exists
  const adminEmail = 'admin@nirmaanacademy.com';
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const hashedPassword = await hash('admin123', 12);
    await prisma.user.create({
      data: {
        name: 'Admin User',
        email: adminEmail,
        password: hashedPassword,
        role: 'ADMIN',
        bio: 'Administrator of Nirmaan Academy',
      },
    });
  }

  // Create course categories
  const courseCategories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'business-law-courses' },
      update: {},
      create: {
        name: 'Business Law Courses',
        slug: 'business-law-courses',
        description: 'Comprehensive courses on business law and regulations',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'company-law-courses' },
      update: {},
      create: {
        name: 'Company Law Courses',
        slug: 'company-law-courses',
        description: 'In-depth courses on company law and corporate governance',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'finance-law-courses' },
      update: {},
      create: {
        name: 'Finance Law Courses',
        slug: 'finance-law-courses',
        description: 'Specialized courses on financial laws and regulations',
      },
    }),
  ]);

  // Create instructor for courses
  const instructor = await prisma.user.upsert({
    where: { email: 'nitin.bhardwaj@nirmaanacademy.com' },
    update: {},
    create: {
      name: 'Prof. Nitin Bhardwaj',
      email: 'nitin.bhardwaj@nirmaanacademy.com',
      role: 'INSTRUCTOR',
      bio: 'Expert in Business Law and Corporate Governance',
      image: '/images/instructors/nitin-bhardwaj.jpg',
    },
  });

  // Create sample courses
  const courses = [
    {
      title: 'Business Law Fundamentals',
      slug: 'business-law-fundamentals',
      description: 'A comprehensive course covering the essential principles of business law.',
      price: 2999,
      status: CourseStatus.PUBLISHED,
      thumbnail: '/images/courses/business-law.jpg',
      durationInHours: 20,
      featured: true,
      instructorId: instructor.id,
      categoryId: courseCategories[0].id,
      sections: [
        {
          title: 'Introduction to Business Law',
          position: 1,
          lessons: [
            {
              title: 'Understanding Legal Framework',
              description: 'Basic concepts and principles of business law',
              position: 1,
              duration: 1800,
              isFree: true,
            },
            {
              title: 'Types of Business Entities',
              description: 'Different forms of business organizations',
              position: 2,
              duration: 2400,
              isFree: false,
            },
          ],
        },
        {
          title: 'Contract Law',
          position: 2,
          lessons: [
            {
              title: 'Elements of a Contract',
              description: 'Essential elements of a valid contract',
              position: 1,
              duration: 1800,
              isFree: false,
            },
            {
              title: 'Contract Formation',
              description: 'Process of contract formation and validity',
              position: 2,
              duration: 2400,
              isFree: false,
            },
          ],
        },
      ],
    },
    {
      title: 'Company Law Mastery',
      slug: 'company-law-mastery',
      description: 'Advanced course on company law and corporate governance.',
      price: 3999,
      status: CourseStatus.PUBLISHED,
      thumbnail: '/images/courses/company-law.jpg',
      durationInHours: 30,
      featured: true,
      instructorId: instructor.id,
      categoryId: courseCategories[1].id,
      sections: [
        {
          title: 'Company Formation',
          position: 1,
          lessons: [
            {
              title: 'Incorporation Process',
              description: 'Steps to incorporate a company',
              position: 1,
              duration: 1800,
              isFree: true,
            },
            {
              title: 'Legal Requirements',
              description: 'Legal requirements for company formation',
              position: 2,
              duration: 2400,
              isFree: false,
            },
          ],
        },
        {
          title: 'Corporate Governance',
          position: 2,
          lessons: [
            {
              title: 'Board Structure',
              description: 'Understanding board structure and responsibilities',
              position: 1,
              duration: 1800,
              isFree: false,
            },
            {
              title: 'Shareholder Rights',
              description: 'Rights and responsibilities of shareholders',
              position: 2,
              duration: 2400,
              isFree: false,
            },
          ],
        },
      ],
    },
    {
      title: 'Finance Law Essentials',
      slug: 'finance-law-essentials',
      description: 'Essential course on financial laws and regulations.',
      price: 3499,
      status: CourseStatus.PUBLISHED,
      thumbnail: '/images/courses/finance-law.jpg',
      durationInHours: 25,
      featured: true,
      instructorId: instructor.id,
      categoryId: courseCategories[2].id,
      sections: [
        {
          title: 'Financial Regulations',
          position: 1,
          lessons: [
            {
              title: 'Banking Laws',
              description: 'Understanding banking regulations',
              position: 1,
              duration: 1800,
              isFree: true,
            },
            {
              title: 'Securities Law',
              description: 'Regulations governing securities market',
              position: 2,
              duration: 2400,
              isFree: false,
            },
          ],
        },
        {
          title: 'Compliance',
          position: 2,
          lessons: [
            {
              title: 'Financial Compliance',
              description: 'Understanding financial compliance requirements',
              position: 1,
              duration: 1800,
              isFree: false,
            },
            {
              title: 'Reporting Standards',
              description: 'Financial reporting standards and requirements',
              position: 2,
              duration: 2400,
              isFree: false,
            },
          ],
        },
      ],
    },
  ];

  // Create courses with sections and lessons
  for (const course of courses) {
    const { sections, ...courseData } = course;
    const createdCourse = await prisma.course.upsert({
      where: { slug: course.slug },
      update: {},
      create: courseData,
    });

    for (const section of sections) {
      const { lessons, ...sectionData } = section;
      const createdSection = await prisma.section.create({
        data: {
          ...sectionData,
          courseId: createdCourse.id,
          position: sectionData.position,
        },
      });

      for (const lesson of lessons) {
        await prisma.lesson.create({
          data: {
            ...lesson,
            sectionId: createdSection.id,
            position: lesson.position,
          },
        });
      }
    }
  }

  // Create blog categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'business-law' },
      update: {},
      create: {
        name: 'Business Law',
        slug: 'business-law',
        description: 'Articles related to business law and regulations',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'company-law' },
      update: {},
      create: {
        name: 'Company Law',
        slug: 'company-law',
        description: 'Updates and insights about company law',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'corporate-law' },
      update: {},
      create: {
        name: 'Corporate Law',
        slug: 'corporate-law',
        description: 'Corporate governance and legal aspects',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'finance-law' },
      update: {},
      create: {
        name: 'Finance Law',
        slug: 'finance-law',
        description: 'Legal aspects of business finance',
      },
    }),
  ]);

  // Create tags
  const tags = await Promise.all([
    prisma.tag.upsert({
      where: { slug: 'legal-updates' },
      update: {},
      create: {
        name: 'Legal Updates',
        slug: 'legal-updates',
      },
    }),
    prisma.tag.upsert({
      where: { slug: 'business-tips' },
      update: {},
      create: {
        name: 'Business Tips',
        slug: 'business-tips',
      },
    }),
    prisma.tag.upsert({
      where: { slug: 'corporate-governance' },
      update: {},
      create: {
        name: 'Corporate Governance',
        slug: 'corporate-governance',
      },
    }),
    prisma.tag.upsert({
      where: { slug: 'finance' },
      update: {},
      create: {
        name: 'Finance',
        slug: 'finance',
      },
    }),
  ]);

  // Create sample blog posts
  const posts = [
    {
      title: 'Understanding Business Law Fundamentals',
      slug: 'understanding-business-law-fundamentals',
      excerpt: 'A comprehensive guide to the basic principles of business law and their practical applications in today\'s corporate world.',
      content: `
        <h2>Introduction to Business Law</h2>
        <p>Business law is a crucial field that governs commercial transactions, business relationships, and corporate operations. Understanding its fundamentals is essential for anyone involved in business operations.</p>
        
        <h2>Key Components of Business Law</h2>
        <ul>
          <li>Contract Law</li>
          <li>Corporate Law</li>
          <li>Employment Law</li>
          <li>Intellectual Property</li>
        </ul>
        
        <h2>Practical Applications</h2>
        <p>In today's business environment, understanding business law helps in:</p>
        <ul>
          <li>Making informed business decisions</li>
          <li>Protecting business interests</li>
          <li>Ensuring regulatory compliance</li>
          <li>Managing business relationships</li>
        </ul>
        
        <h2>Conclusion</h2>
        <p>A solid understanding of business law fundamentals is crucial for business success in today's complex legal environment.</p>
      `,
      featuredImage: '/images/blog/business-law.jpg',
      featuredImageAlt: 'Business law books and documents on a desk',
      status: PostStatus.PUBLISHED,
      publishedAt: new Date(),
      readTimeMinutes: 8,
      metaTitle: 'Understanding Business Law Fundamentals - Nirmaan Academy Blog',
      metaDescription: 'A comprehensive guide to the basic principles of business law and their practical applications in today\'s corporate world.',
      categoryId: categories[0].id,
      tagIds: [tags[0].id, tags[1].id],
    },
    {
      title: 'Key Changes in Company Law 2024',
      slug: 'key-changes-company-law-2024',
      excerpt: 'Stay updated with the latest amendments and changes in company law that every business professional should know.',
      content: `
        <h2>Recent Amendments in Company Law</h2>
        <p>The year 2024 brings significant changes to company law that will impact businesses across the country.</p>
        
        <h2>Key Changes</h2>
        <ul>
          <li>Digital Compliance Requirements</li>
          <li>Enhanced Corporate Governance</li>
          <li>Updated Reporting Standards</li>
          <li>New Compliance Deadlines</li>
        </ul>
        
        <h2>Impact on Businesses</h2>
        <p>These changes will affect various aspects of business operations:</p>
        <ul>
          <li>Compliance procedures</li>
          <li>Reporting requirements</li>
          <li>Corporate governance practices</li>
          <li>Digital transformation needs</li>
        </ul>
      `,
      featuredImage: '/images/blog/company-law.jpg',
      featuredImageAlt: 'Modern office building representing corporate law',
      status: PostStatus.PUBLISHED,
      publishedAt: new Date(),
      readTimeMinutes: 6,
      metaTitle: 'Key Changes in Company Law 2024 - Nirmaan Academy Blog',
      metaDescription: 'Stay updated with the latest amendments and changes in company law that every business professional should know.',
      categoryId: categories[1].id,
      tagIds: [tags[0].id, tags[2].id],
    },
  ];

  for (const post of posts) {
    const { tagIds, ...postData } = post;
    const createdPost = await prisma.post.upsert({
      where: { slug: post.slug },
      update: {},
      create: {
        ...postData,
        authorId: instructor.id,
      },
    });

    // Connect tags to the post
    await prisma.post.update({
      where: { id: createdPost.id },
      data: {
        tags: {
          connect: tagIds.map(id => ({ id })),
        },
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 