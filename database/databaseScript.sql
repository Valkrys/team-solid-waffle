DROP DATABASE IF EXISTS careerLattice;

CREATE DATABASE IF NOT EXISTS careerLattice;

USE careerLattice;

CREATE TABLE IF NOT EXISTS jobFamily(
#      familyID TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    jobFamilyName VARCHAR(50) UNIQUE NOT NULL PRIMARY KEY,
    CONSTRAINT `jobFamily_name_len` CHECK ( LENGTH(jobFamilyName) <= 50)
);

CREATE TABLE IF NOT EXISTS capability(
#      capabilityID TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    capabilityName VARCHAR(50) UNIQUE NOT NULL PRIMARY KEY ,
#      familyID TINYINT UNSIGNED UNIQUE NOT NULL,
    jobFamilyName VARCHAR(50) NOT NULL,
#      FOREIGN KEY (familyID) REFERENCES jobFamily(familyID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (jobFamilyName) REFERENCES jobFamily(jobFamilyName) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `capability_name_len` CHECK ( LENGTH(capabilityName) <= 50)
);

CREATE TABLE IF NOT EXISTS band(
#     bandID TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    bandName VARCHAR(50) UNIQUE NOT NULL PRIMARY KEY,
    responsibilities VARCHAR(1500),
    CONSTRAINT `band_name_len` CHECK ( LENGTH(bandName) <= 50),
    CONSTRAINT `band_responsibilities_len` CHECK ( LENGTH(responsibilities) <= 1500)
);

CREATE TABLE IF NOT EXISTS job(
    jobID SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    jobName VARCHAR(50) NOT NULL,
#     capabilityID TINYINT UNSIGNED NOT NULL,
    capabilityName VARCHAR(50) NOT NULL,
    description VARCHAR(300) NOT NULL,
#     bandID TINYINT UNSIGNED NOT NULL,
    bandName VARCHAR(50) NOT NULL,
    responsibilities VARCHAR(1500),
    training VARCHAR(1500),
#     FOREIGN KEY (capabilityID) REFERENCES capability(capabilityID) ON DELETE CASCADE ON UPDATE CASCADE,
#     FOREIGN KEY (bandID) REFERENCES band(bandID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (capabilityName) REFERENCES capability(capabilityName) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (bandName) REFERENCES band(bandName) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `job_name_len` CHECK ( LENGTH(jobName) <= 50),
    CONSTRAINT `job_description_len` CHECK ( LENGTH(description) <= 300),
    CONSTRAINT `job_responsibilities_len` CHECK ( LENGTH(responsibilities) <= 1500),
    CONSTRAINT `job_training_len` CHECK ( LENGTH(training) <= 1500),
#     CONSTRAINT `job_unique_check` UNIQUE (name, capabilityID, bandID),
    CONSTRAINT `job_unique_check` UNIQUE (jobName, capabilityName, bandName)
);

CREATE TABLE IF NOT EXISTS capabilityLead(
    capabilityLeadID TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    capabilityLeadName VARCHAR(50) NOT NULL,
    picture VARCHAR(200),
    message VARCHAR(300),
#       capabilityID TINYINT UNSIGNED NOT NULL,
    capabilityName VARCHAR(50) NOT NULL,
#     FOREIGN KEY (capabilityID) REFERENCES capability(capabilityID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (capabilityName) REFERENCES capability(capabilityName) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `capabilityLead_name_len` CHECK ( LENGTH(capabilityLeadName) <= 50),
    CONSTRAINT `capabilityLead_picture_len` CHECK ( LENGTH(picture) <= 100),
    CONSTRAINT `capabilityLead_message_len` CHECK ( LENGTH(message) <= 300)
);

CREATE TABLE IF NOT EXISTS user(
    userID SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(50) NOT NULL,
    jobID SMALLINT UNSIGNED NOT NULL,
    isAdmin BOOLEAN DEFAULT 0 NOT NULL,
    FOREIGN KEY (jobID) REFERENCES job(jobID) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `user_firstName_len` CHECK ( LENGTH(firstName) <= 50),
    CONSTRAINT `user_lastName_len` CHECK ( LENGTH(lastName) <= 50),
    CONSTRAINT `user_username_len` CHECK ( LENGTH(username) >= 8 AND LENGTH(username) <= 50),
    CONSTRAINT `user_password_len` CHECK ( LENGTH(password) >= 8 AND LENGTH(password) <= 50 ),
    CONSTRAINT `user_username_format` CHECK(`username` LIKE '%@%.%')
);

INSERT INTO jobFamily(jobFamilyName) VALUES ('Sales & Marketing'),
                                   ('Technical'),
                                   ('Consulting'),
                                   ('Experience Design'),
                                   ('Management'),
                                   ('Central Services Teams');

INSERT INTO capability(capabilityName, jobFamilyName) VALUES ('Business Development', 'Sales & Marketing'),
                                                ('Account Management','Sales & Marketing'),
                                                ('Sales','Sales & Marketing'),
                                                ('Inside Sales Development','Sales & Marketing'),
                                                ('Pre Sales & Bid Management','Sales & Marketing'),
                                                ('Marketing','Sales & Marketing'),
                                                ('Software Engineering', 'Technical'),
                                                ('Data Engineering', 'Technical'),
                                                ('Cyber Security', 'Technical'),
                                                ('Architect', 'Technical'),
                                                ('Ops', 'Technical'),
                                                ('Infrastructure', 'Technical'),
                                                ('Testing', 'Technical'),
                                                ('Analytics', 'Technical'),
                                                ('Integration', 'Technical'),
                                                ('Product Specialist', 'Technical'),
                                                ('Product Support', 'Technical'),
                                                ('Technical Specialist', 'Technical'),
                                                ('Product', 'Consulting'),
                                                ('Agile', 'Consulting'),
                                                ('HCM', 'Consulting'),
                                                ('Research', 'Experience Design'),
                                                ('UX Design', 'Experience Design'),
                                                ('Creative Design', 'Experience Design'),
                                                ('Service Design', 'Experience Design'),
                                                ('Project Management', 'Management'),
                                                ('Support Management', 'Management'),
                                                ('Finance & P M O', 'Central Services Teams'),
                                                ('Commercial', 'Central Services Teams'),
                                                ('People', 'Central Services Teams'),
                                                ('Facilities', 'Central Services Teams'),
                                                ('Administration', 'Central Services Teams'),
                                                ('Travel', 'Central Services Teams'),
                                                ('Strategy', 'Central Services Teams'),
                                                ('Systems', 'Central Services Teams');

INSERT INTO band(bandName, responsibilities)
    VALUES ('Apprentice', 'Competency framework does not directly apply at this Job Level for now. Please see Associate to assist with your career planning.'),

       ('Trainee', 'You consistently cooperate with the business processes completing accurately and honestly e.g. timesheets/EOY review/travel requests.
        You willingly cooperate by volunteering to take on additional tasks that will benefit the business e.g. Recruitment events such as University careers fairs, EAYL open evening, Work experience mentoring.
        You understand how the business generates income.'),

       ('Associate', 'You understand the contribution your role makes to the success of the business, consistently delivering to task deadlines. You understand and the need for the business to generate additional income and respect that costs need to be managed.
        You know what you have to do to manage costs within the business.
        You complete expenses honestly, on time and accurately.
        You consistently achieve your personal productive utilisation target.
        You understand how your team supports increased income for Kainos.'),

       ('Senior Associate', 'You understand how the company makes profit and how your role affects profitability of the company.
        You create honest time estimates and are determined to deliver upon these.
        You question actions where appropriate and identify cost-effective approaches.
        You respectfully challenge commercial decisions to contribute an increase in profitability.
        You manage and meet the expectations of customers without compromising budgets.
        You understand the organisational structure of Kainos, your reporting lines and can actively identify where key responsibilities lie.'),

       ('Consultant', 'You look beyond immediate problems/issues to see the impact on the bigger picture.
        You use financial information to find pragmatic new ways of saving cost/effort without reducing throughput.
        You manage people and your resources effectively and efficiently.
        You are aware of and actively use project/financial information to manage profitability e.g.. revisiting estimates.
        You understand the commercial implications of changes in scope and negotiate with customers proactively.
        You understand the impact of decisions on BU and company profitability and support company decisions that affect profitability.
        You identify potential new opportunities for the company to generate income and proactively take action to progress.
        You actively engage and contribute to sales activities such as presales bids, presentations for new clients.'),

       ('Manager', 'You put forward sound business cases to gain support for new and more effective methods of working.
        You prioritise actions to minimise costs and maximise advantage across the organisation.
        You understand the need to demonstrate a return on investment in activities and identify opportunities for generating income.
        You actively pursue alternative ideas and ways of working to gain cost savings.
        You lead successful initiatives that create a positive image of Kainos with potential to generate more income.
        You support the company''s commercial decisions and ensure that your team understand the reasons for these decisions.
        You understand and are able to articulate the company mission statement, culture, values and business goals and behave accordingly at all times.
        You prepare strong and influential business cases, understanding the needs of all stakeholders.
        You understand and identify risk to the business and proactively mitigate and manage.'),

       ('Principal', 'You take a balanced view of wider impact on the organisation when making significant changes.
        You strive to add measurable and significant value to the longer term growth of Kainos and take calculated risks in order to do so.
        You influence and negotiate creating commercial strategies that maximise return, reduce cost and drive improvement in quality.'),

       ('Leadership Community', 'Competency framework does not directly apply at this Job Level.');

INSERT INTO job(jobName, capabilityName, description, bandName, responsibilities, training)
    VALUES ('Designer',
        'UX Design',
        'Graduate entry level, here to learn, but primarily to contribute to projects.',
        'Trainee',
        'Represent Kainos at careers fairs or Kainos open evenings events if invited.
        Immediately tell your manager if your tasks are not going to be complete within the expected timeframe.
        Notify your line manager if there are dependencies that are impacting your work.
        Escalate to your line manager if you do not have appropriate project goals.
        Notify HR if you have not received your project review on time.',
        'Trainee Development Programme. Presentation Skills - Foundation'),

       ('Designer',
        'Creative Design',
        'Graduate entry level, here to learn, but primarily to contribute to projects.',
        'Trainee',
        'Represent Kainos at careers fairs or Kainos open evenings events if invited.
        Immediately tell your manager if your tasks are not going to be complete within the expected timeframe.
        Notify your line manager if there are dependencies that are impacting your work.
        Escalate to your line manager if you do not have appropriate project goals.
        Notify HR if you have not received your project review on time.',
        'Trainee Development Programme. Presentation Skills - Foundation'),

           ('Software Engineer',
        'Software Engineering',
        'Here primarily to learn; contributes to projects.',
        'Apprentice',
        'Carry out all professional administration (timesheets, keeping calendar and voicemail up-to-date).
        Notify your manager if you are sick and cannot attend work. Be a representative at the Earn-As-You-Learn or Apprentice events if invited.
        Attend training courses when invited.
        Raise any concerns/issues/problems directly with your manager or your career coach.',
        null),

       ('Software Engineer',
        'Software Engineering',
        'Graduate entry level, here to learn, but primarily to contribute to projects.',
        'Trainee',
        'Represent Kainos at careers fairs or Kainos open evenings events if invited.
       Immediately tell your manager if your tasks are not going to be complete within the expected timeframe.
       Notify your line manager if there are dependencies that are impacting your work.
       Escalate to your line manager if you do not have appropriate project goals.
       Notify HR if you have not received your project review on time.',
        'Coaching - Foundation.
       Interview Skills - Foundation.
       Train the Trainer.
       Kainos as a Business.
       Presentation Skills - Foundation.
       Agile Drill.
       Certified Scrum Master.
       People Manager Toolkit: Performance.
       Consultant Development Programme.'),

       ('Software Engineer',
        'Software Engineering',
        'Established deliverer, works well in a team.',
        'Associate',
        'Mentor junior team members.
       Deliver your tasks within the timelines while adhering to the Kainos quality standards.
       Set professional self-development goals, including asking for training.
       Maintain a Kainos CV and store it in the correct location.',
        'Kainos as a Business.
       Presentation Skills - Foundation.
       Coaching - Foundation.'),

       ('Software Engineer',
        'Software Engineering',
        'Delivers with limited supervision, trusted to make tactical decisions.',
        'Senior Associate',
        'Make your line manager aware if you think someone may be considering leaving the company.
       Help with recruitment activities',
        'Coaching - Foundation.
       Interview Skills - Foundation.
       Train the Trainer.
       Kainos as a Business.
       Presentation Skills - Foundation.
       People Manager Toolkit: Performance.
       Consultant Development Programme.'),


       ('Lead Software Engineer',
        'Software Engineering',
        'Expert in their field, is consulted by others, supervises others, works well even if under pressure, effectively coaches people.',
        'Consultant',
        'Be an active career coach and to escalate to their line manager if stretch goals are not set for your coachees.
       Ensure that your coachee has received an appraisal and regular feedback and to escalate to HR if this is not the case.
       Visibly and regularly share knowledge.
       Actively identify and develop talent and highlight to your BU talent manager.
       Contribute to presales activities – completion of bids, presenting, tender qualification, bid management etc.
       Provide constructive feedback and record it on Workday.',
        'People Manager Toolkit: Performance.
       Coaching - Foundation.
       Coaching - Intermediate.
       Interview Skills - Foundation.
       Train the Trainer.
       Influencing Others.
       Negotiating Successfully.
       Kainos as a Business.
       Agile Drill.
       Certified Scrum Master.
       People Manager Toolkit: Emotional Wellbeing.
       Consultant Development Programme.'),

       ('Trainee Data Engineer',
        'Data Engineering',
        'Graduate entry level, here to learn, but primarily to contribute to projects.',
        'Trainee',
        'Represent Kainos at careers fairs or Kainos open evenings events if invited.
       Immediately tell your manager if your tasks are not going to be complete within the expected timeframe.
       Notify your line manager if there are dependencies that are impacting your work.
       Escalate to your line manager if you do not have appropriate project goals.
       Notify HR if you have not received your project review on time.',
        'Presentation Skills - Foundation.'),

       ('Data Engineer',
        'Data Engineering',
        'Established deliverer, works well in a team.',
        'Associate',
        'Mentor junior team members.
       Deliver your tasks within the timelines while adhering to the Kainos quality standards.
       Set professional self-development goals, including asking for training.
       Maintain a Kainos CV and store it in the correct location.',
        'Kainos as a Business. Presentation Skills - Foundation. Coaching - Foundation.'),

       ('Data Engineer',
        'Data Engineering',
        'Delivers with limited supervision, trusted to make tactical decisions.',
        'Senior Associate',
        'Make your line manager aware if you think someone may be considering leaving the company.
       Help with recruitment activities.',
        'Coaching - Foundation.
       Interview Skills - Foundation.
       Train the Trainer.
       Kainos as a Business.
       Presentation Skills - Foundation.
       People Manager Toolkit: Performance.
       Agile Drill.
       Consultant Development Programme.'),

       ('Lead Data Engineer',
        'Data Engineering',
        'Expert in their field, is consulted by others, supervises others, works well even if under pressure, effectively coaches people.',
        'Consultant',
        'Be an active career coach and to escalate to their line manager if stretch goals are not set for your coachees.
       Ensure that your coachee has received an appraisal and regular feedback and to escalate to HR if this is not the case.
       Visibly and regularly share knowledge.
       Actively identify and develop talent and highlight to your BU talent manager.
       Contribute to presales activities – completion of bids, presenting, tender qualification, bid management etc.
       Provide constructive feedback and record it on Workday.',
        'People Manager Toolkit: Performance.
       Coaching - Foundation.
       Coaching - Intermediate.
       Interview Skills - Foundation.
       Train the Trainer.
       Influencing Others.
       Negotiating Successfully.
       Kainos as a Business.
       Agile Drill.
       Certified Scrum Master.
       People Manager Toolkit: Emotional Wellbeing.
       Consultant Development Programme.');

INSERT INTO capabilityLead(capabilityLeadName, picture, message, capabilityName)
VALUES ('Jason Lee', null, 'Please let me know if you have any questions about Sales', 'Sales'),
       ('Reece Bennett', null, 'I am be available in the Birmingham office between 9am and 5pm', 'Software Engineering');
