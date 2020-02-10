class Message < ApplicationRecord
  belongs_to :from_user, :class_name => 'User'
  belongs_to :to_user, :class_name => 'User'

  # by default, messages returned in ascending order of created_at
  default_scope { order(created_at: :asc) }
end