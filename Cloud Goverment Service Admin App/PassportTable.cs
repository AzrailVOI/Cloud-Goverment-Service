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
    public partial class PassportTable : Form
    {
        public PassportTable()
        {
            InitializeComponent();
            dataGridView1.SelectionMode = DataGridViewSelectionMode.FullRowSelect;
            dataGridView1.AllowUserToAddRows = false;
            foreach (DataTable dt in Program.ds.Tables)
            {
                //MessageBox.Show(dt.TableName);
            }
            dataGridView1.DataSource = Program.ds.Tables[0];
            if (dataGridView1.DataSource == null)
            {
                MessageBox.Show("Null");
            }
        }

        private void returnButton_Click(object sender, EventArgs e)
        {
            Close();
        }

        private void PassportTable_Load(object sender, EventArgs e)
        {
            // TODO: данная строка кода позволяет загрузить данные в таблицу "cGSDBDataSet.PassportsTable". При необходимости она может быть перемещена или удалена.
            //this.passportsTableTableAdapter.Fill(this.cGSDBDataSet.PassportsTable);

        }

        private void SaveButton_Click(object sender, EventArgs e)
        {
            if (!Program.SaveToDB())
            {
                MessageBox.Show("Not saved");
            }
        }

        private void passportsTableBindingSource_CurrentChanged(object sender, EventArgs e)
        {

        }

        private void addButton_Click(object sender, EventArgs e)
        {
            Program.AddToTable();
        }

        private void deleteButton_Click(object sender, EventArgs e)
        {
            foreach (DataGridViewRow row in dataGridView1.SelectedRows)
            {
                dataGridView1.Rows.Remove(row);
            }
        }

        private void findButton_Click(object sender, EventArgs e)
        {
            UpdateView();
            //findTextBox.Text
        }
        private void UpdateView()
        {
            dataGridView1.ClearSelection();
            passportsTableBindingSource.SuspendBinding();
            dataGridView1.CurrentCell = null;
            for (int i = 0; i < dataGridView1.Rows.Count; i++)
            {
                bool t = false;
                if (findTextBox.Text != string.Empty)
                {
                    for (int j = 0; j < dataGridView1.Rows[i].Cells.Count; j++)
                    {
                        if (dataGridView1.Rows[i].Cells[j].Value != null && dataGridView1.Rows[i].Cells[j].Value.ToString().Contains(findTextBox.Text))
                        {
                            t = true;
                        }
                    }
                }
                else
                {
                    t = true;
                }
                dataGridView1.Rows[i].Visible = t;
            }
            dataGridView1.Update();
            passportsTableBindingSource.ResumeBinding();

        }

        private void findTextBox_TextChanged(object sender, EventArgs e)
        {
            UpdateView();
        }
    }
}
