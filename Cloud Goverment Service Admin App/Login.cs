using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace EPostWindowsFormsApp
{
    public partial class Login : Form
    {
        public Login()
        {
            InitializeComponent();
        }

        private void Login_Load(object sender, EventArgs e)
        {
            UpdateData();
        }
        public void UpdateData()
        {
            Properties.Settings.Default.Reload();
            Program.Username = Properties.Settings.Default["Username"].ToString();
            Program.Password = Properties.Settings.Default["Password"].ToString();

            usernameTextBox.Text = Program.Username;
            passwordTextBox.Text = Program.Password;
            SaveLoginCheckBox.Checked = (bool)Properties.Settings.Default["SavePassword"];
        }
        private void loginButton_Click(object sender, EventArgs e)
        {
            Program.Username = usernameTextBox.Text;
            Program.Password = passwordTextBox.Text;

            Properties.Settings.Default["Username"] = Program.Username;
            if (SaveLoginCheckBox.Checked)
            {
                Properties.Settings.Default["Password"] = Program.Password;
            }
            else
            {
                Properties.Settings.Default["Password"] = "";
            }
            Properties.Settings.Default.Save();

            if(Program.Login(Program.Username, Program.Password))
            {
                Program.MainMenuForm = new MMenu();
                Program.MainMenuForm.Show();
                Hide();
            }
            else
            {
                MessageBox.Show("Incorrect login or password");
            }

        }


        private void ShowPasswordCheckBox_CheckedChanged(object sender, EventArgs e)
        {
            passwordTextBox.UseSystemPasswordChar = !passwordTextBox.UseSystemPasswordChar;
        }

        private void SaveLoginCheckBox_CheckedChanged(object sender, EventArgs e)
        {
            Properties.Settings.Default["SavePassword"] = SaveLoginCheckBox.Checked;
        }
    }
}
