-- Table: accepteddeclined
CREATE TABLE accepteddeclined (
    job_id INT DEFAULT NULL,
    applicant_id INT DEFAULT NULL,
    status ENUM('true','false') DEFAULT NULL,
    recruiter_id INT DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table: applied_jobs
CREATE TABLE applied_jobs (
    job_id INT DEFAULT NULL,
    applicant_id INT DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table: jobs
CREATE TABLE jobs (
    job_id INT NOT NULL AUTO_INCREMENT,
    user_id INT DEFAULT NULL,
    job_title VARCHAR(55) DEFAULT NULL,
    job_desc VARCHAR(500) DEFAULT NULL,
    job_employeeList JSON DEFAULT NULL,
    job_technologies JSON DEFAULT NULL,
    job_languages JSON DEFAULT NULL,
    PRIMARY KEY (job_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table: saved_jobs
CREATE TABLE saved_jobs (
    job_id INT DEFAULT NULL,
    user_id INT DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table: user_avatar
CREATE TABLE user_avatar (
    user_avatar_id INT NOT NULL AUTO_INCREMENT,
    user_id INT DEFAULT NULL,
    user_avatar_content LONGBLOB,
    PRIMARY KEY (user_avatar_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table: user_des
CREATE TABLE user_des (
    user_id INT DEFAULT NULL,
    user_desc VARCHAR(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table: user_roles
CREATE TABLE user_roles (
    user_id INT DEFAULT NULL,
    user_roles JSON DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table: user_tags
CREATE TABLE user_tags (
    user_id INT DEFAULT NULL,
    user_tags JSON DEFAULT NULL,
    UNIQUE KEY user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table: user_technologies
CREATE TABLE user_technologies (
    user_id INT DEFAULT NULL,
    user_technologies JSON DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table: users
CREATE TABLE users (
    user_id INT NOT NULL AUTO_INCREMENT,
    user_role ENUM('Recruiter','Employee') DEFAULT NULL,
    user_name VARCHAR(30) DEFAULT NULL,
    user_surname VARCHAR(30) DEFAULT NULL,
    user_password VARCHAR(255) DEFAULT NULL,
    user_email VARCHAR(255) DEFAULT NULL,
    user_phoneNumber VARCHAR(20) DEFAULT NULL,
    user_birthdate DATE DEFAULT NULL,
    user_gender ENUM('male','female') DEFAULT NULL,
    PRIMARY KEY (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;