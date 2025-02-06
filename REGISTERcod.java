//REGISTER

import java.sql.*;
import java.util.Scanner;

public class REGISTERcod
{
    public static void main(String[] args) throws ClassNotFoundException
    {
        Scanner ag = new Scanner(System.in);

        System.out.println("please enter your name: ");
        String nAme = ag.next();
        System.out.println("please enter new username: ");
        String userName = ag.next();
        System.out.println("please enter your email: ");
        String eMail = ag.next();
        System.out.println("please enter your phone number: ");
        String phonr_Number = ag.next();
        System.out.println("please enter your location: ");
        String lOcation = ag.next();
        System.out.println("please enter your pincode: ");
        String pIncode = ag.next();
        System.out.println("please enter new password: ");
        String pAssword = ag.next();


        //data base url & query
        String url = "jdbc:mysql://localhost:3306/hackwizards";
        String query = "INSERT INTO register(name,username,email,phone_number,location,pincode,password)"+"VALUES('"+ nAme +"','"+ userName+ "','"+ eMail +"','"+phonr_Number+"','"+lOcation+"','"+pIncode+"','"+pAssword+"')";


        //credentials
        String username = "root";
        String password = "Argha@9330";


        //Drivers load
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        }
        catch (ClassNotFoundException e)
        {
            System.out.println(e.getMessage());
        }

        try
        {
            Connection con = DriverManager.getConnection(url,username,password);
            Statement stmt = con.createStatement();
            int rowsaffected = stmt.executeUpdate(query);

            if ((rowsaffected>0))
            {
                System.out.println("your RAGISTERATION has been completed!!!!!!!!");
            }
            else
            {
                System.out.println("something is wrong\n" +
                        "please try again");
            }


            stmt.close();
            con.close();
            System.out.println();
        }
        catch (SQLException e)
        {
            System.out.println(e.getMessage());
        }
    }
}