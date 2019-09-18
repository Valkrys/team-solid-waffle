DROP DATABASE IF EXISTS careerLattice;

CREATE DATABASE IF NOT EXISTS careerLattice;

USE careerLattice;

CREATE TABLE IF NOT EXISTS jobFamily(
    jobFamilyID TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    CONSTRAINT `jobFamily_name_len` CHECK ( LENGTH(name) <= 50)
);

CREATE TABLE IF NOT EXISTS capability(
    capabilityID TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    jobFamilyID TINYINT UNSIGNED NOT NULL,
    FOREIGN KEY (jobFamilyID) REFERENCES jobFamily(jobFamilyID) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `capability_name_len` CHECK ( LENGTH(name) <= 50)
);

CREATE TABLE IF NOT EXISTS training(
    trainingID SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(200) UNIQUE NOT NULL,
    CONSTRAINT `training_description_len` CHECK ( LENGTH(description) <= 200)
);

CREATE TABLE IF NOT EXISTS band(
    bandID TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    commercial VARCHAR(1500),
    communication VARCHAR(1500),
    innovation VARCHAR(1500),
    customerFocus VARCHAR(1500),
    development VARCHAR(1500),
    planning VARCHAR(1500),
    knowledge VARCHAR(1500),
    trainingID SMALLINT UNSIGNED,
    bandRank TINYINT UNSIGNED UNIQUE NOT NULL,
    FOREIGN KEY (trainingID) REFERENCES training(trainingID) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `band_name_len` CHECK ( LENGTH(name) <= 50),
    CONSTRAINT `band_commercial_len` CHECK ( LENGTH(commercial) <= 1500),
    CONSTRAINT `band_communication_len` CHECK ( LENGTH(communication) <= 1500),
    CONSTRAINT `band_innovatoon_len` CHECK ( LENGTH(innovation) <= 1500),
    CONSTRAINT `band_customer_focus_len` CHECK ( LENGTH(customerFocus) <= 1500),
    CONSTRAINT `band_development_len` CHECK ( LENGTH(development) <= 1500),
    CONSTRAINT `band_planning_len` CHECK ( LENGTH(planning) <= 1500),
    CONSTRAINT `band_knowledge_len` CHECK ( LENGTH(knowledge) <= 1500)
);

CREATE TABLE IF NOT EXISTS role(
    roleID SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    capabilityID TINYINT UNSIGNED NOT NULL,
    description VARCHAR(300) NOT NULL,
    bandID TINYINT UNSIGNED NOT NULL,
    responsibilities VARCHAR(1500),
    trainingID SMALLINT UNSIGNED,
    FOREIGN KEY (trainingID) REFERENCES training(trainingID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (capabilityID) REFERENCES capability(capabilityID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (bandID) REFERENCES band(bandID) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `role_name_len` CHECK ( LENGTH(name) <= 50),
    CONSTRAINT `role_description_len` CHECK ( LENGTH(description) <= 300),
    CONSTRAINT `role_responsibilities_len` CHECK ( LENGTH(responsibilities) <= 1500),
    CONSTRAINT `role_unique_check` UNIQUE (name, capabilityID, bandID)
);

CREATE TABLE IF NOT EXISTS user(
    userID SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(50) NOT NULL,
    roleID SMALLINT UNSIGNED NOT NULL,
    isAdmin BOOLEAN DEFAULT 0 NOT NULL,
    FOREIGN KEY (roleID) REFERENCES role(roleID) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `user_firstName_len` CHECK ( LENGTH(firstName) <= 50),
    CONSTRAINT `user_lastName_len` CHECK ( LENGTH(lastName) <= 50),
    CONSTRAINT `user_username_len` CHECK ( LENGTH(username) >= 8 AND LENGTH(username) <= 50),
    CONSTRAINT `user_password_len` CHECK ( LENGTH(password) >= 8 AND LENGTH(password) <= 50 ),
    CONSTRAINT `user_username_format` CHECK(`username` LIKE '%@%.%')
);

CREATE TABLE IF NOT EXISTS capabilityLead(
    capabilityLeadID TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    picture VARCHAR(200),
    message VARCHAR(300),
    userID SMALLINT UNSIGNED NOT NULL,
    FOREIGN KEY (userID) REFERENCES user(userID) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `capabilityLead_picture_len` CHECK ( LENGTH(picture) <= 100),
    CONSTRAINT `capabilityLead_message_len` CHECK ( LENGTH(message) <= 300)
);



INSERT INTO jobFamily(name) VALUES ('Sales & Marketing'),
                                   ('Technical'),
                                   ('Consulting'),
                                   ('Experience Design'),
                                   ('Management'),
                                   ('Central Services Teams');

INSERT INTO capability(name, jobFamilyID) VALUES ('Business Development', 1),
                                                ('Account Management',1),
                                                ('Sales',1),
                                                ('Inside Sales Development',1),
                                                ('Pre Sales & Bid Management',1),
                                                ('Marketing',1),
                                                ('Software Engineering', 2),
                                                ('Data Engineering', 2),
                                                ('Cyber Security', 2),
                                                ('Architect', 2),
                                                ('Ops', 2),
                                                ('Infrastructure', 2),
                                                ('Testing', 2),
                                                ('Analytics', 2),
                                                ('Integration', 2),
                                                ('Product Specialist', 2),
                                                ('Product Support', 2),
                                                ('Technical Specialist', 2),
                                                ('Product', 3),
                                                ('Agile', 3),
                                                ('HCM', 3),
                                                ('Research', 4),
                                                ('UX Design', 4),
                                                ('Creative Design', 4),
                                                ('Service Design', 4),
                                                ('Project Management', 5),
                                                ('Support Management', 5),
                                                ('Finance & P M O', 6),
                                                ('Commercial', 6),
                                                ('People', 6),
                                                ('Facilities', 6),
                                                ('Administration', 6),
                                                ('Travel', 6),
                                                ('Strategy', 6),
                                                ('Systems', 6);


INSERT INTO training(description)
    VALUES("https://learning.kainos.com");

INSERT INTO band(name, commercial, communication, innovation, customerFocus, development, planning, knowledge, trainingID, bandRank)
    VALUES ('Apprentice', "", "", "", "", "", "", "", null, 1),

       ('Trainee', 'You consistently cooperate with the business processes completing accurately and honestly e.g. timesheets/EOY review/travel requests
        You willingly cooperate by volunteering to take on additional tasks that will benefit the business e.g. Recruitment events such as University careers fairs, EAYL open evening, Work experience mentoring
        You understand how the business generates income', 'You are open and honest in your opinions.
        You respect others by attending meetings on time and contributing where appropriate.
        You forecast your annual leave so the team can plan for your absence.
        You understand how your job relates to others within your function.
        You are aware of the consequences of your own behaviour and how this may affect others within the team', 'You seek advice where appropriate
        You actively cooperate with the team and contribute to team discussions about improvement.
        You are flexible when it comes to work assignments responsibility, location.', "You act in accordance with the Kainos values demonstrating through your behaviours and interactions with colleagues and customers",
        "You are flexible and willing to learn. You set SMART objectives in Workday and discuss and agree with your manager", "You make sure that you understand the task that you are required to deliver and escalate to your manager if you are unsure of what is required from you
        You understand the timelines for your tasks and plan your time effectively to ensure that deadlines are met.
        You are honest and escalate to your manager if you do not believe that you can complete your tasks within the specified time.", "You actively cooperate and participate in training completing all pre and post training work
        You understand the investment that the company has made in you and set personal development goals to allow you to address gaps and advance to an Associate level within 18 months of joining the company",
        1, 2),

       ('Associate', "You understand the contribution your role makes to the success of the business, consistently delivering to task deadlines
You understand and the need for the business to generate additional income and respect that costs need to be managed
You know what you have to do to manage costs within the business
You complete expenses honestly, on time and accurately
You consistently achieve your personal productive utilisation target
You understand how your team supports increased income for Kainos", "You get involved at meetings, ask questions, listen and give honest information when appropriate. You actively participate and cooperate within the team helping others and sharing workload.
You focus on shared goals playing a full part in their successful completion.
You are communicative and clear in your thoughts and ideas when approached by others
You give consideration to the communication needs of staff in other locations
You are able to interact effectively in a situation you find stressful or frustrating knowing when to remove yourself from a situation to allow you to compose yourself
You have an awareness of the activities in other jobs and departments", "You actively seek out colleagues in order to share thoughts and ideas that may be use or interest to them
Your share your ideas (creative) with colleagues and seek support from management in developing those ideas
You share information, insights or comments in order to improve an individual/an area of the business, when it would be easier to refrain from doing so.", "You know who your customer is and what problem the team is trying to solve
You consistently strive to provide a quality service and showcase Kainos positively", "You seek out new challenges that may stretch your abilities
You learn from people and ask for their ideas and opinions.
You are cooperative and ask others to participate in meetings/activities where you think that they can add value.
You manage your emotions and respond honestly and calmly when under pressure.
You are able to identify analyse a problem and either drill down to the root cause or escalate to another for help
You are quick to take considered action in order to achieve a positive outcome when faced with an opportunity or problem.
You explain technical or specialist information to new or less experienced colleagues to enable them to do their jobs
You have your own internal standards of performance which match or exceed those imposed by others", "You plan your time effectively and consistently meet task deadlines
You keep honest records of your achievements to discuss with your manager during your 1-2-1", "You respect the need for you to do your role well and actively learn the functional and technical knowledge and skills that are necessary to do your job with a high level of accomplishment (determined)
You use appropriate tools, technology or process for the task
You take decisions independently and are able to get on with your job, escalating decisions only when appropriate", 1, 3),

       ('Senior Associate', "You understand how the company makes profit and how your role affects profitability of the company. You create honest time estimates and are determined to deliver upon these. You question actions where appropriate and identify cost-effective approaches. You respectfully challenge commercial decisions to contribute an increase in profitability
You manage and meet the expectations of customers without compromising budgets. You understand the organisational structure of Kainos, your reporting lines and can actively identify where key responsibilities lie", "You use honest data and facts in a clear and constructive way to support arguments and gain agreement
You are open to giving and receiving honest feedback in order to highlight areas for improvement and recognise high performance.
You appreciate the impact of decisions on others and mitigate or minimise any negative effects
You recognise and respect that communication is a two way process and demonstrate effective questioning and active listening skills to achieve this
You persuade and influence with sound rational argument, 'appealing to others' interest or reason to gain support.", "You proactively look for creative/better ways of doing things and put forward improvements in order to improve performance
You identify problems, carefully consider and test possible options, evaluate pros and cons and consequences of various decisions and create a range of solutions
You suggest and implement practical and workable solutions", "You respond honestly and promptly to customer requests and whenever possible within agreed timeframes
You keep promises made to your customer
You are authentic in stakeholder relations and take pride in being inclusive and trustworthy.", "You identify your learning and development needs and actively seek opportunities to gain this experience
You seek and respond positively to feedback regarding your own learning and development
You constructively challenge colleagues, including those in positions of authority.
You state alternative views with confidence and respect.
You adapt your behaviours and act in the most appropriate way to enable others to respond constructively
You tailor your responses to be constructive and diffuse tense situations and calm others
You acknowledge the capabilities of others in your team and publicly recognise your colleagues who have performed well
You offer help or advice when team members are struggling to ensure that the team as a whole is successful.
You give advice and guidance and provide practical support to others to help them understand tasks. You give 'how to' demonstrations or instructions and explain how others can achieve performance expectations", "You overcome obstacles to ensure work gets done on time
You effectively prioritise workload to meet important objectives", "You have the capability and knowledge base to share job specific skills with others
You demonstrate an active interest in enhancing current skills and learning new ones
You demonstrate a good level of accomplishment in job performance", 1, 4),

       ('Consultant', "You look beyond immediate problems/issues to see the impact on the bigger picture
You use financial information to find pragmatic new ways of saving cost/effort without reducing throughput
You manage people and your resources effectively and efficiently
You are aware of and actively use project/financial information to manage profitability e.g.. revisiting estimates
You understand the commercial implications of changes in scope and negotiate with customers proactively
You understand the impact of decisions on BU and company profitability and support company decisions that affect profitability
You identify potential new opportunities for the company to generate income and proactively take action to progress
You actively engage and contribute to sales activities such as presales bids, presentations for new clients", "You recognise and build on individual strengths of colleagues/team members
You build relationships based on trust
You identify personally with the team and are proud of its achievements
You publicise what team members have achieved and give feedback and recognition awards where due
You act as an influential and effective member of multi-disciplinary teams or projects
You use communication to create a shared sense of purpose and direction
You initiate collaboration and actively encourage people to cooperate in initiatives where you think that they can add value
You lead by example demonstrating openness and honesty with your team
You proactively identify internal and external talent and support them in finding developmental opportunities e.g. recruitment, career coaching", "You invite regular feedback on performance from team members and customers
You quickly turn new ideas into clear and effective improvements
You take responsibility for others, encouraging and supporting others who make suggestions for improvement", "You assess your customer needs accurately by listening and applying sensitive questioning
You manage customer expectations in relation to scope of work being honest with what can and cannot be achieved within timelines
You negotiate with customers to reflect changes in scope of work
You actively seek feedback and suggestions to improve customer service", "You consistently give constructive feedback to others in relation to the performance areas for improvement
You make independent decisions and are able to 'get on with the job' escalating decisions only when appropriate
You draw on your past experiences to solve problems
You assist others in developing capability by educating them in your areas of specialism through a variety of forums - eg MAP courses, demonstrations, show and tells, blogs and thought leadership initiatives.
You are an active career coach and are able to objectively demonstrate how you coached others in your team to improve their performance
You identify and mentor new people and help them achieve success in their roles", "You motivate and encourage others to achieve planned results
If appropriate to role, you manage your team effectively, delegating work to use people and resources to best effect
You ensure colleagues are aware of changes in priorities and help them to plan their workload
You monitor progress and put effort in where it is most needed to achieve the end goal
You develop effective systems to organise and track workload", "You choose appropriate tools or technology for solutions; experiments with new processes, tools, or technologies to determine applicability
You apply advanced functional or technical knowledge to do your job at a high level of accomplishment
You improve or redesign processes, tools, or technologies to achieve business needs
You consistently share expertise with others, teach skills and explain concepts
You demonstrate an avid interest in continuously enhancing current skills and learning new ones", 1, 5),

       ('Manager', "ou put forward sound business cases to gain support for new and more effective methods of working
You prioritise actions to minimise costs and maximise advantage across the organisation
You understand the need to demonstrate a return on investment in activities and identify opportunities for generating income
You actively pursue alternative ideas and ways of working to gain cost savings
You lead successful initiatives that create a positive image of Kainos with potential to generate more income
You support the company's commercial decisions and ensure that your team understand the reasons for these decisions
You understand and are able to articulate the company mission statement, culture, values and business goals and behave accordingly at all times
You prepare strong and influential business cases, understanding the needs of all stakeholders
You understand and identify risk to the business and proactively mitigate and manage", "You role model company values, even when there is significant risk in doing so
You address issues within your team and deliver difficult conversations when staff expectations need aligned or behaviours do not reflect the Kainos values
You understand that your role is to 'Challenge' and 'Protect' those under your management fostering longer term career development for the benefit of Kainos
You use team dynamics to construct the most effective team structures
You clarify the vision and goals for every team member ensuring your team understands the role they have to play in the business
You demonstrate effective networking skills to maintain a broad range of trusted contacts throughout the Company
You develops strategies which ensure win-win solutions for all parties
You create the Kainos culture placing high value on successful delivery, co-creation and cooperation, honesty, respect and creativeness
You understand the people risk within your team and mitigate and proactively manage ensuring adherence to policies and processes e.g. Retention/Succession Planning/Well Being)", "You understand that proposed innovation and changes should have a clear link to improving the business results delivered
You set standards for quality and ensures best practice
You integrate systems and processes to avoid duplication of effort
You understand how changes might impact differently on different stakeholders and address arising issues
You take ownership and accountability for problems and the generation of solutions
You communicates and manage the need for change delivering the corporate message
You create a culture where new ideas are encouraged and evaluated; obstacles removed and people and resources are used in the most effective way in order to achieve Company goals
You capitalise on opportunities to improve processes, systems or efficiency supporting the company's decision on corporate tools", "You manage expectations so customers always feels valued and have a positive experience of Kainos
You champion customer service improvement initiatives
You create a culture of professionalism in dealing with customers at all levels", "You tailor development approaches to suit the needs of each team member
You identify potential developmental opportunities for individuals within your team, making them happen whilst managing the impact within your team
You evaluate the effectiveness of training in the development of your team
You understand the talent development process and effectively use to take accountability for the development of staff
You create a supportive coaching culture and share your knowledge and skills to groups of individuals", "You organise people and resources to successfully achieve both short and medium term objectives
You confidently juggle complex projects of different size and priority
You empower individuals and pass decision making down to the lowest appropriate level", "You provide opportunities for others to learn functional and technical skills and concepts
You apply advanced functional or technical knowledge to process innovation and complex problem solving
You continually seeks to improve or redesign processes, tools, or technologies to enhance business efficiency and relevance
You are sought by others for functional or technical expertise and knowledge and for troubleshooting of complex issues
You demonstrates an excellent level of accomplishment in job performance", 1, 6),

       ('Principal', "You take a balanced view of wider impact on the organisation when making significant changes
You strive to add measurable and significant value to the longer term growth of Kainos and take calculated risks in order to do so.
You influence and negotiate creating commercial strategies that maximise return, reduce cost and drive improvement in quality", "You achieve widely accepted 'buy in' by explaining benefits at both individual and department level
You build collaborative partnerships across the company
You build cohesive formal and informal teams and networks across the organisation which deliver significant added value
You lead the implementation of changes with a positive approach delivering and respecting the need for the company message
You understand the culture and proactively instil within your team, understanding what is and not possible to achieve within the organisation
You build capability, processes and structures to speed the development of skills and the future leaders so the business can scale sustainably.", "You create strategies that introduce improvements across your business unit and the Kainos group", "You anticipate customer's future needs, identifies their key strategic issues and positively challenges unfounded assumptions
You create mutually supportive and loyal relationships with all major customers
You see the wider picture, understand the levels of service that are valued by customers and ensures that these are the priority at all times
You understand and apply sector-wide standards", "You create an environment which encourages continuous learning and development and have led and contributed to the development of capability across the group
You actively sponsor and participate MAP training programmes to ensure that the skills required by the business are available to drive future growth
You take accountability for ensuring that there is a clear talent pipeline within your area of responsibility
You are an active role model ensuring that each of your direct reports are managed in accordance with the talent management process eg performance reviews/retention/succession/career development plans are in place.
You ensure that the group management processes are actively adapted by all members of staff within your responsibility.", "You plan effectively for the medium and long term, reviewing strategies and revising to meet changing business needs
You actively make use of management information available in order to understand issues
You liaises effectively with colleagues outside of immediate team to coordinate activities and encourage your team to participate with others outside your team and BU where appropriate
You produce a consistent, 'no blame' culture, with a feeling of pride and achievement", "You anticipate and understand future trends in functional or technical skills and process
You actively drive the necessary changes to role and learning requirements to ensure the Company is best placed to adapt to new challenges
You demonstrates an outstanding level of accomplishment in job performance", 1, 7),

       ('Leadership Community', "", "", "", "", "", "", "", null, 8);

INSERT INTO role(name, capabilityID, description, bandID, responsibilities, trainingID)
    VALUES ('Designer',
        23,
        'Graduate entry level, here to learn, but primarily to contribute to projects.',
        2,
        'Represent Kainos at careers fairs or Kainos open evenings events if invited.
        Immediately tell your manager if your tasks are not going to be complete within the expected timeframe.
        Notify your line manager if there are dependencies that are impacting your work.
        Escalate to your line manager if you do not have appropriate project goals.
        Notify HR if you have not received your project review on time.', 1),

       ('Designer',
        24,
        'Graduate entry level, here to learn, but primarily to contribute to projects.',
        2,
        'Represent Kainos at careers fairs or Kainos open evenings events if invited.
        Immediately tell your manager if your tasks are not going to be complete within the expected timeframe.
        Notify your line manager if there are dependencies that are impacting your work.
        Escalate to your line manager if you do not have appropriate project goals.
        Notify HR if you have not received your project review on time.',
        1),

           ('Software Engineer',
        7,
        'Here primarily to learn; contributes to projects.',
        1,
        'Carry out all professional administration (timesheets, keeping calendar and voicemail up-to-date).
        Notify your manager if you are sick and cannot attend work. Be a representative at the Earn-As-You-Learn or Apprentice events if invited.
        Attend training courses when invited.
        Raise any concerns/issues/problems directly with your manager or your career coach.', 1),

       ('Software Engineer',
        7,
        'Graduate entry level, here to learn, but primarily to contribute to projects.',
        2,
        'Represent Kainos at careers fairs or Kainos open evenings events if invited.
       Immediately tell your manager if your tasks are not going to be complete within the expected timeframe.
       Notify your line manager if there are dependencies that are impacting your work.
       Escalate to your line manager if you do not have appropriate project goals.
       Notify HR if you have not received your project review on time.', 1),

       ('Software Engineer',
        7,
        'Established deliverer, works well in a team.',
        3,
        'Mentor junior team members.
       Deliver your tasks within the timelines while adhering to the Kainos quality standards.
       Set professional self-development goals, including asking for training.
       Maintain a Kainos CV and store it in the correct location.', 1),

       ('Software Engineer',
        7,
        'Delivers with limited supervision, trusted to make tactical decisions.',
        4,
        'Make your line manager aware if you think someone may be considering leaving the company.
       Help with recruitment activities', 1),


       ('Lead Software Engineer',
        7,
        'Expert in their field, is consulted by others, supervises others, works well even if under pressure, effectively coaches people.',
        5,
        'Be an active career coach and to escalate to their line manager if stretch goals are not set for your coachees.
       Ensure that your coachee has received an appraisal and regular feedback and to escalate to HR if this is not the case.
       Visibly and regularly share knowledge.
       Actively identify and develop talent and highlight to your BU talent manager.
       Contribute to presales activities – completion of bids, presenting, tender qualification, bid management etc.
       Provide constructive feedback and record it on Workday.', 1),

       ('Trainee Data Engineer',
        8,
        'Graduate entry level, here to learn, but primarily to contribute to projects.',
        2,
        'Represent Kainos at careers fairs or Kainos open evenings events if invited.
       Immediately tell your manager if your tasks are not going to be complete within the expected timeframe.
       Notify your line manager if there are dependencies that are impacting your work.
       Escalate to your line manager if you do not have appropriate project goals.
       Notify HR if you have not received your project review on time.', 1),

       ('Data Engineer',
        8,
        'Established deliverer, works well in a team.',
        3,
        'Mentor junior team members.
       Deliver your tasks within the timelines while adhering to the Kainos quality standards.
       Set professional self-development goals, including asking for training.
       Maintain a Kainos CV and store it in the correct location.', 1),

       ('Data Engineer',
        8,
        'Delivers with limited supervision, trusted to make tactical decisions.',
        4,
        'Make your line manager aware if you think someone may be considering leaving the company.
       Help with recruitment activities.', 1),

       ('Lead Data Engineer',
        8,
        'Expert in their field, is consulted by others, supervises others, works well even if under pressure, effectively coaches people.',
        5,
        'Be an active career coach and to escalate to their line manager if stretch goals are not set for your coachees.
       Ensure that your coachee has received an appraisal and regular feedback and to escalate to HR if this is not the case.
       Visibly and regularly share knowledge.
       Actively identify and develop talent and highlight to your BU talent manager.
       Contribute to presales activities – completion of bids, presenting, tender qualification, bid management etc.
       Provide constructive feedback and record it on Workday.', 1);

SOURCE database/usersScript.sql;

INSERT INTO capabilityLead(picture, message, capabilityLeadID, userID)
VALUES (null, 'Please let me know if you have any questions about Sales', 3, 1),
       (null, 'I am be available in the Birmingham office between 9am and 5pm', 7, 2);