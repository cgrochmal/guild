class MessageSerializer < ActiveModel::Serializer
  attributes :id, :body, :from_user_id, :to_user_id, :created_at
end