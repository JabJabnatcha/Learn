INSERT INTO Classes (ClassName)
VALUES
('Barbarian'),
('Bard'),
('Cleric'),
('Druid'),
('Fighter'),
('Monk'),
('Paladin'),
('Ranger'),
('Rogue'),
('Sorcerer'),
('Warlock'),
('Wizard');



SELECT TOP (1000) [ClassId]
      ,[ClassName]
  FROM [J_MessengerDb].[dbo].[Classes]
