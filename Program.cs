using System.Net.Http;
using System.Threading.Tasks;
using System.Diagnostics;

class Program
{
    static HttpClient client = new HttpClient();
    static string serverUrl = "https://pcremoteclient.onrender.com";

    static async Task Main()
    {
        Console.WriteLine("PC Remote Client çalışıyor. Komutlar dinleniyor...");

        while (true)
        {
            try
            {
                string cmd = await client.GetStringAsync($"{serverUrl}/get-command");

                if (!string.IsNullOrWhiteSpace(cmd))
                {
                    Console.WriteLine("Gelen komut: " + cmd);

                    if (cmd == "shutdown")
                        Process.Start("shutdown", "/s /f /t 0");

                    else if (cmd == "restart")
                        Process.Start("shutdown", "/r /f /t 0");

                    else if (cmd == "lock")
                        Process.Start("rundll32.exe", "user32.dll,LockWorkStation");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Hata: " + ex.Message);
            }

            await Task.Delay(1500);
        }
    }
}
