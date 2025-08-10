INSERT INTO Alignments (Name)
VALUES
('Lawful Good'),
('Neutral Good'),
('Chaotic Good'),
('Lawful Neutral'),
('True Neutral'),
('Chaotic Neutral'),
('Lawful Evil'),
('Neutral Evil'),
('Chaotic Evil');


SELECT TOP (1000) [AlignmentId]
      ,[Name]
  FROM [J_MessengerDb].[dbo].[Alignments]
