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
    public partial class MMenu : Form
    {
        private PassportTable passportTable;
        public MMenu()
        {
            InitializeComponent();
            tablesComboBox.Items.Clear();
            for (int i = 0; i < Program.tablesNamesList.Count; i++)
            {
                tablesComboBox.Items.Add(Program.tablesNamesList[i]);
            }
            if(tablesComboBox.Items.Count > 0) { tablesComboBox.SelectedIndex = 0; }
            
        }

        private void logoutButton_Click(object sender, EventArgs e)
        {
            Program.LoginForm.UpdateData();
            Program.LoginForm.Show();
            Close();
        }

        private void MMenu_Load(object sender, EventArgs e)
        {
            usernameLabel.Text = Program.Username;
            switch (Program.AccessLevel)
            {
                case AccessLevel.User:
                    accessLevelLabel.Text = "User";
                    break;
                case AccessLevel.Admin:
                    accessLevelLabel.Text = "Admin";
                    break;
                default:
                    accessLevelLabel.Text = "No access";
                    break;
            }
        }

        private void PassportTableButton_Click(object sender, EventArgs e)
        {
            if (passportTable == null || passportTable.IsDisposed)
            {
                //MessageBox.Show(tablesComboBox.SelectedItem.ToString());
                if(tablesComboBox.SelectedItem != null && Program.GetTable(tablesComboBox.SelectedItem.ToString(), Program.Username, Program.Password))
                {
                    passportTable = new PassportTable();
                    passportTable.Show();
                }
                else
                {

                }
            }
            else
            {
                passportTable.Activate();
            }
        }

        private void tablesComboBox_SelectedIndexChanged(object sender, EventArgs e)
        {

        }
    }
}
