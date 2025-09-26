import java.io.*;
import java.net.*;

public class Server {
    public static void main(String[] args) throws Exception {
        ServerSocket ss = new ServerSocket(1234);
        System.out.println("Server started. Waiting...");
        Socket s = ss.accept();
        System.out.println("Client connected!");

        BufferedReader in = new BufferedReader(new InputStreamReader(s.getInputStream()));
        PrintWriter out = new PrintWriter(s.getOutputStream(), false);
        BufferedReader console = new BufferedReader(new InputStreamReader(System.in));

        while (true) {
            String msg = in.readLine();
            System.out.println("Client: " + msg);
            System.out.print("You: ");
            out.println(console.readLine());
        }
    }
}
