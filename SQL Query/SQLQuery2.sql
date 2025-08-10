INSERT INTO Races (RaceName, Str_race, Agi_race, Wis_race, Con_race, Int_race, Cha_race)
VALUES
('Human', 1, 1, 1, 1, 1, 1),
('Dwarf', 0, 0, 0, 2, 0, 0),
('Elf', 0, 2, 0, 0, 0, 0),
('Halfling', 0, 2, 0, 0, 0, 0),
('Dragonborn', 2, 0, 0, 0, 0, 1),
('Gnome', 0, 0, 0, 0, 2, 0),
('Half-Elf', 0, 0, 0, 0, 0, 2),
('Half-Orc', 2, 0, 0, 1, 0, 0),
('Tiefling', 0, 0, 0, 0, 1, 2);

SELECT TOP (1000) [RaceId]
      ,[RaceName]
      ,[Str_race]
      ,[Agi_race]
      ,[Wis_race]
      ,[Con_race]
      ,[Int_race]
      ,[Cha_race]
  FROM [J_MessengerDb].[dbo].[Races]
