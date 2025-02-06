//data retrive

import java.util.Scanner;

import java.util.Random;
import java.sql.*;
public class logincode
{
    public static void main(String[] args) throws ClassNotFoundException {
        System.out.println("please enter your Email");
        Scanner ag = new Scanner(System.in);
        String emAil = ag.next();
        Random rand = new Random();
        int rand_int = rand.nextInt(100000, 999999);
        System.out.println("your otp is: " + rand_int);
        int user_input = ag.nextInt();

        if (rand_int == user_input)
        {

            //data base url & query
            String url = "jdbc:mysql://localhost:3306/hackwizards";
            String query = "select * from register where email = '" + emAil + "'";

            //credentials
            String username = "root";
            String password = "Argha@9330";

            //connecting with the database
            try {
                Class.forName("com.mysql.cj.jdbc.Driver");
            } catch (ClassNotFoundException e) {
                System.out.println(e.getMessage());
            }

            try {
                Connection con = DriverManager.getConnection(url, username, password);
                Statement stmt = con.createStatement();
                ResultSet rs = stmt.executeQuery(query);
                while (rs.next()) {
                    String name = rs.getString("name");
                    String username1 = rs.getString("username");
                    String email = rs.getString("email");
                    String phone_number = rs.getString("phone_number");
                    String location = rs.getString("location");
                    String pincode = rs.getString("pincode");
                    String password1 = rs.getString("password");

                    System.out.println();
                    System.out.println("===============================");
                    System.out.println("NAME:" + name);
                    System.out.println("USERNAME:" + username1);
                    System.out.println("EMAIL:" + email);
                    System.out.println("PHONE_NUMBER:" + phone_number);
                    System.out.println("LOCATION:" + location);
                    System.out.println("PINCODE:" + pincode);
                    System.out.println("PASSWORD:" + password1);

                }
                rs.close();
                stmt.close();
                con.close();
            } catch (SQLException e) {
                System.out.println(e.getMessage());
            }
        }
        else
        {
            System.out.println("you entered wrong otp");
        }
    }
}
