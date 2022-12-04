using EPostWindowsFormsApp.CGSDBDataSetTableAdapters;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace EPostWindowsFormsApp
{
    public enum AccessLevel
    {
        None = 0,
        User = 1,
        ReaderKey = 2,
        WriterKey = 3,
        ReaderAll = 4,
        Admin = 5
    }
    internal static class Program
    {
        private static Login loginForm;
        private static MMenu mainMenuForm;
        private static string username;
        private static string password;
        private static AccessLevel accessLevel;

        public static DataSet ds;
        public static SqlDataAdapter adapter;
        public static SqlCommandBuilder commandBuilder;

        public static string serverAddress = "MRowa-PC";
        public static string dataBase = "CGSDB";
        public static string connectionString = "@Server = myServerAddress; Database=myDataBase;User Id = myUsername; Password=myPassword;";
        public static string sqlTables = "SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_TYPE LIKE '%TABLE%'";
        public static string sqlWithoutTableName = "SELECT * FROM ";
        public static string sql = "SELECT * FROM PassportsTable";
        public static List<string> tablesNamesList = new List<string>();

        public static string Password { get => password; set => password = value; }
        public static string Username { get => username; set => username = value; }
        public static MMenu MainMenuForm { get => mainMenuForm; set => mainMenuForm = value; }
        public static Login LoginForm { get => loginForm; set => loginForm = value; }
        public static AccessLevel AccessLevel { get => accessLevel; set => accessLevel = value; }

        [STAThread]
        static void Main()
        {
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);
            LoginForm = new Login();
            Application.Run(LoginForm);
        }
        public static bool GetTable(string tableName, string username, string password)
        {
            connectionString = "Server = " + serverAddress + "; Database = " + dataBase + "; User Id =" + username + "; password = " + password + ";";
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                try
                {
                    connection.Open();

                    adapter = new SqlDataAdapter(sqlWithoutTableName + tableName, connection);

                    ds = new DataSet();
                    adapter.Fill(ds);
                }
                catch
                {
                    connection.Close();
                    return false;
                }
                connection.Close();
                return true;
            }
        }
        public static bool Login(string username, string password)
        {
            connectionString = "Server = " + serverAddress + "; Database = " + dataBase + "; User Id =" + username + "; password = " + password + ";";
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                tablesNamesList.Clear();
                SqlCommand command = new SqlCommand(sqlTables, connection);
                try
                {
                    connection.Open();
                    SqlDataReader reader = command.ExecuteReader();
                    while (reader.Read())
                    {
                        for (int i = 0; i < reader.FieldCount; i++)
                        {
                            if(reader.GetString(i) != "sysdiagrams")
                            {
                                tablesNamesList.Add(reader.GetString(i));
                            }
                        }
                    }
                }
                catch (SqlException ex)
                {
                    MessageBox.Show("Ошибка:" + ex);
                    connection.Close();
                    return false;
                }
                accessLevel = AccessLevel.Admin;
                connection.Close();
                return true;
            }
        }
        public static bool AddToTable()
        {
            try
            {
                DataRow row = ds.Tables[0].NewRow();
                ds.Tables[0].Rows.Add(row);
                return true;
            }
            catch
            {
                return false;
            }
        }
        public static bool SaveToDB()
        {
            connectionString = "Server = " + serverAddress + "; Database = " + dataBase + "; User Id =" + username + "; password = " + password + ";";
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                try
                {
                    connection.Open();
                    adapter = new SqlDataAdapter(sql, connection);
                    commandBuilder = new SqlCommandBuilder(adapter);
                    adapter.InsertCommand = new SqlCommand("sp_CreateUser", connection);

                    adapter.Update(ds);
                    connection.Close();
                    return true;
                }
                catch
                {
                    connection.Close();
                    return false;
                }
            }
            return false;
        }
    }
}
