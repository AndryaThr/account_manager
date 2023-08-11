--
-- Fichier généré par SQLiteStudio v3.3.3 sur mar. août 8 14:59:11 2023
--
-- Encodage texte utilisé : System
--
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- Table : account
DROP TABLE IF EXISTS account;

CREATE TABLE account (
    acc_id       INTEGER  PRIMARY KEY AUTOINCREMENT
                          NOT NULL,
    acc_user     INTEGER  REFERENCES user (user_id) ON DELETE CASCADE
                                                    ON UPDATE CASCADE
                          NOT NULL,
    acc_name     VARCHAR  NOT NULL,
    acc_uname    VARCHAR,
    acc_mail     VARCHAR,
    acc_token    VARCHAR,
    acc_password VARCHAR  NOT NULL,
    acc_sm       INTEGER  REFERENCES sm_data (sm_id) ON DELETE CASCADE
                                                     ON UPDATE CASCADE
                          NOT NULL,
    acc_phone    VARCHAR,
    acc_addate   DATETIME
);


-- Table : security_question
DROP TABLE IF EXISTS security_question;

CREATE TABLE security_question (
    sq_id     INTEGER PRIMARY KEY AUTOINCREMENT
                      NOT NULL,
    sq_query  TEXT    NOT NULL,
    sq_answer TEXT    NOT NULL,
    account   INTEGER REFERENCES account (acc_id) ON DELETE CASCADE
                                                  ON UPDATE CASCADE
                      NOT NULL
);


-- Table : sm_category
DROP TABLE IF EXISTS sm_category;

CREATE TABLE sm_category (
    id        INTEGER PRIMARY KEY AUTOINCREMENT
                      NOT NULL,
    label_fr  VARCHAR NOT NULL,
    label_eng VARCHAR NOT NULL,
    folder    VARCHAR
);


-- Table : sm_data
DROP TABLE IF EXISTS sm_data;

CREATE TABLE sm_data (
    sm_id       INTEGER PRIMARY KEY AUTOINCREMENT
                        NOT NULL,
    sm_label    VARCHAR NOT NULL,
    sm_category INTEGER REFERENCES sm_category (id) ON DELETE CASCADE
                                                    ON UPDATE CASCADE
                        DEFAULT (0),
    sm_icon     VARCHAR DEFAULT [default.png]
);


-- Table : user
DROP TABLE IF EXISTS user;

CREATE TABLE user (
    user_id          INTEGER NOT NULL
                             PRIMARY KEY AUTOINCREMENT,
    user_name        VARCHAR NOT NULL,
    user_firstname   VARCHAR,
    user_digit       VARCHAR,
    user_password    VARCHAR NOT NULL,
    user_private_key VARCHAR
);


-- Vue : joint_account_security_question
DROP VIEW IF EXISTS joint_account_security_question;
CREATE VIEW joint_account_security_question AS
    SELECT account.*,
           security_question.sq_id AS id,
           security_question.sq_answer AS answer,
           security_question.sq_query AS question
      FROM account
           LEFT JOIN
           security_question ON account.acc_id = security_question.account;


-- Vue : joint_account_social_media
DROP VIEW IF EXISTS joint_account_social_media;
CREATE VIEW joint_account_social_media AS
    SELECT account.*,
           sm_data.sm_icon AS icon,
           sm_data.sm_label AS platform,
           sm_data.sm_category AS category_id,
           sm_category.folder AS folder,
           sm_category.label_fr AS category_fr,
           sm_category.label_eng AS category_eng
      FROM account
           LEFT JOIN
           sm_data ON account.acc_sm = sm_data.sm_id
           LEFT JOIN
           sm_category ON sm_data.sm_category = sm_category.id;


-- Vue : joint_account_social_media_reduced
DROP VIEW IF EXISTS joint_account_social_media_reduced;
CREATE VIEW joint_account_social_media_reduced AS
    SELECT account.acc_id,
           account.acc_user,
           account.acc_name,
           account.acc_uname,
           account.acc_addate,
           sm_data.sm_icon AS icon,
           sm_data.sm_label AS platform,
           sm_data.sm_category AS category_id,
           sm_category.folder AS folder,
           sm_category.label_fr AS category_fr,
           sm_category.label_eng AS category_eng
      FROM account
           LEFT JOIN
           sm_data ON account.acc_sm = sm_data.sm_id
           LEFT JOIN
           sm_category ON sm_data.sm_category = sm_category.id;


-- Vue : joint_sm_category
DROP VIEW IF EXISTS joint_sm_category;
CREATE VIEW joint_sm_category AS
    SELECT sm_data.*,
           sm_category.label_fr,
           sm_category.label_eng,
           sm_category.folder
      FROM sm_data
           LEFT JOIN
           sm_category ON sm_data.sm_category = sm_category.id;


COMMIT TRANSACTION;
PRAGMA foreign_keys = on;
