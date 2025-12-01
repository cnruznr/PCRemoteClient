using System;

public static class Utils
{
    public static void Log(string msg)
    {
        Console.ForegroundColor = ConsoleColor.Cyan;
        Console.WriteLine("[LOG] " + msg);
        Console.ResetColor();
    }

    public static void Error(string msg)
    {
        Console.ForegroundColor = ConsoleColor.Red;
        Console.WriteLine("[ERROR] " + msg);
        Console.ResetColor();
    }
}
