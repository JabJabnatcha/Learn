namespace DndGame.Api.Entities;

public class CharacterProfile
{
    public int Age { get; }
    public string Height { get; }
    public string Weight { get; }
    public string Eyes { get; }
    public string Skin { get; }
    public string Hair { get; }

    public CharacterProfile(
        int age = 0,
        string height = "",
        string weight = "",
        string eyes = "",
        string skin = "",
        string hair = ""
    )
    {
        Age = ValidateAge(age);
        Height = height;
        Weight = weight;
        Eyes = eyes;
        Skin = skin;
        Hair = hair;
    }

    private int ValidateAge(int age)
    {
        if (age < 0)
            return 0;

        return age;
    }
}