using System;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

public class WebSocketClient
{
    private ClientWebSocket _socket;
    private readonly string _url;

    public event Action<string>? OnMessageReceived;

    public WebSocketClient(string url)
    {
        _url = url;
        _socket = new ClientWebSocket();
    }

    public async Task Connect()
    {
        await _socket.ConnectAsync(new Uri(_url), CancellationToken.None);

        _ = Task.Run(ReceiveLoop);
    }

    public async Task Send(string message)
    {
        var buffer = Encoding.UTF8.GetBytes(message);
        await _socket.SendAsync(new ArraySegment<byte>(buffer),
                                WebSocketMessageType.Text,
                                true,
                                CancellationToken.None);
    }

    private async Task ReceiveLoop()
    {
        var buffer = new byte[2048];

        while (_socket.State == WebSocketState.Open)
        {
            var result = await _socket.ReceiveAsync(new ArraySegment<byte>(buffer),
                                                    CancellationToken.None);

            if (result.MessageType == WebSocketMessageType.Close)
            {
                await _socket.CloseAsync(WebSocketCloseStatus.NormalClosure,
                                         "Server closed",
                                         CancellationToken.None);
            }
            else
            {
                var message = Encoding.UTF8.GetString(buffer, 0, result.Count);
                OnMessageReceived?.Invoke(message);
            }
        }
    }
}
