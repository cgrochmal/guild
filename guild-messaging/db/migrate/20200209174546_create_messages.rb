class CreateMessages < ActiveRecord::Migration[5.2]
  def change
    create_table :messages do |t|
      t.text :body, null: false
      t.references :from_user, null: false
      t.references :to_user, null: false
      t.timestamps
    end
    add_foreign_key :messages, :users, column: :from_user_id, primary_key: :id
    add_foreign_key :messages, :users, column: :to_user_id, primary_key: :id
  end
end
