export type Notification = {
    message_type: "SUCCESS" | "ERROR" | "";
    message: string;
    has_message: boolean;
};

export type UserModel = {
    created_at: string;
    updated_at: string;
    first_name: string;
    last_name: string;
    email: string;
    display_name: string;
    is_active: boolean;
    password: string;
    id?: string;
};

export type StudyPlan = {
    id: string;
    created_at: string;
    updated_at: string;
    name: string;
    category: string;
    progres: number;
    creator: string;
};

export interface ChatRoomModel {
    id?: string;
    user_id: string;
    room_id: string;
    room_name: string;
}

export interface MessageModel {
    id?: string;
    created_at: string;
    updated_at: string;
    sender_id: string;
    room_id: string;
    read: boolean;
    message: string;
}
