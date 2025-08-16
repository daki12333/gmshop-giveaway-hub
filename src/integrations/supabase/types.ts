export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      discount_codes: {
        Row: {
          code: string
          created_at: string | null
          discount_percentage: number
          discount_type: string | null
          fixed_amount: number | null
          id: string
          is_active: boolean | null
          max_usage: number | null
          usage_count: number | null
        }
        Insert: {
          code: string
          created_at?: string | null
          discount_percentage?: number
          discount_type?: string | null
          fixed_amount?: number | null
          id?: string
          is_active?: boolean | null
          max_usage?: number | null
          usage_count?: number | null
        }
        Update: {
          code?: string
          created_at?: string | null
          discount_percentage?: number
          discount_type?: string | null
          fixed_amount?: number | null
          id?: string
          is_active?: boolean | null
          max_usage?: number | null
          usage_count?: number | null
        }
        Relationships: []
      }
      giveaway_participants: {
        Row: {
          created_at: string | null
          email: string | null
          giveaway_id: string
          id: string
          telegram_username: string
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          giveaway_id: string
          id?: string
          telegram_username: string
        }
        Update: {
          created_at?: string | null
          email?: string | null
          giveaway_id?: string
          id?: string
          telegram_username?: string
        }
        Relationships: [
          {
            foreignKeyName: "giveaway_participants_giveaway_id_fkey"
            columns: ["giveaway_id"]
            isOneToOne: false
            referencedRelation: "giveaways"
            referencedColumns: ["id"]
          },
        ]
      }
      giveaway_winners: {
        Row: {
          giveaway_id: string
          id: string
          participant_id: string
          selected_at: string | null
        }
        Insert: {
          giveaway_id: string
          id?: string
          participant_id: string
          selected_at?: string | null
        }
        Update: {
          giveaway_id?: string
          id?: string
          participant_id?: string
          selected_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "giveaway_winners_giveaway_id_fkey"
            columns: ["giveaway_id"]
            isOneToOne: false
            referencedRelation: "giveaways"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "giveaway_winners_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "giveaway_participants"
            referencedColumns: ["id"]
          },
        ]
      }
      giveaways: {
        Row: {
          created_at: string | null
          description: string
          end_date: string
          id: string
          is_active: boolean | null
          max_participants: number | null
          prize: string
          start_date: string | null
          title: string
          winner_count: number | null
        }
        Insert: {
          created_at?: string | null
          description: string
          end_date: string
          id?: string
          is_active?: boolean | null
          max_participants?: number | null
          prize: string
          start_date?: string | null
          title: string
          winner_count?: number | null
        }
        Update: {
          created_at?: string | null
          description?: string
          end_date?: string
          id?: string
          is_active?: boolean | null
          max_participants?: number | null
          prize?: string
          start_date?: string | null
          title?: string
          winner_count?: number | null
        }
        Relationships: []
      }
      orders: {
        Row: {
          created_at: string | null
          customer_email: string
          discount_amount: number | null
          discount_code: string | null
          id: string
          items: Json
          order_code: string
          referral_code: string | null
          status: string | null
          total_amount: number
        }
        Insert: {
          created_at?: string | null
          customer_email: string
          discount_amount?: number | null
          discount_code?: string | null
          id?: string
          items?: Json
          order_code: string
          referral_code?: string | null
          status?: string | null
          total_amount?: number
        }
        Update: {
          created_at?: string | null
          customer_email?: string
          discount_amount?: number | null
          discount_code?: string | null
          id?: string
          items?: Json
          order_code?: string
          referral_code?: string | null
          status?: string | null
          total_amount?: number
        }
        Relationships: []
      }
      products: {
        Row: {
          category: string
          created_at: string | null
          description: string
          id: string
          image_url: string | null
          low_stock_threshold: number | null
          name: string
          original_price: number | null
          price: number
          show_fake_discount: boolean | null
          stock_quantity: number | null
          track_stock: boolean | null
        }
        Insert: {
          category?: string
          created_at?: string | null
          description: string
          id?: string
          image_url?: string | null
          low_stock_threshold?: number | null
          name: string
          original_price?: number | null
          price?: number
          show_fake_discount?: boolean | null
          stock_quantity?: number | null
          track_stock?: boolean | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string
          id?: string
          image_url?: string | null
          low_stock_threshold?: number | null
          name?: string
          original_price?: number | null
          price?: number
          show_fake_discount?: boolean | null
          stock_quantity?: number | null
          track_stock?: boolean | null
        }
        Relationships: []
      }
      referral_orders: {
        Row: {
          created_at: string | null
          credit_earned: number | null
          id: string
          order_id: string | null
          referral_user_id: string | null
          status: string | null
        }
        Insert: {
          created_at?: string | null
          credit_earned?: number | null
          id?: string
          order_id?: string | null
          referral_user_id?: string | null
          status?: string | null
        }
        Update: {
          created_at?: string | null
          credit_earned?: number | null
          id?: string
          order_id?: string | null
          referral_user_id?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "referral_orders_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referral_orders_referral_user_id_fkey"
            columns: ["referral_user_id"]
            isOneToOne: false
            referencedRelation: "referral_users"
            referencedColumns: ["id"]
          },
        ]
      }
      referral_users: {
        Row: {
          created_at: string | null
          credit_balance: number | null
          credit_per_order: number | null
          email: string
          id: string
          is_active: boolean | null
          password_hash: string
          referral_code: string
          username: string
        }
        Insert: {
          created_at?: string | null
          credit_balance?: number | null
          credit_per_order?: number | null
          email: string
          id?: string
          is_active?: boolean | null
          password_hash: string
          referral_code: string
          username: string
        }
        Update: {
          created_at?: string | null
          credit_balance?: number | null
          credit_per_order?: number | null
          email?: string
          id?: string
          is_active?: boolean | null
          password_hash?: string
          referral_code?: string
          username?: string
        }
        Relationships: []
      }
      sell_requests: {
        Row: {
          admin_notes: string | null
          asking_price: number | null
          created_at: string | null
          customer_email: string
          customer_name: string
          customer_telegram: string
          id: string
          item_category: string | null
          item_description: string
          item_name: string
          status: string | null
        }
        Insert: {
          admin_notes?: string | null
          asking_price?: number | null
          created_at?: string | null
          customer_email: string
          customer_name: string
          customer_telegram: string
          id?: string
          item_category?: string | null
          item_description: string
          item_name: string
          status?: string | null
        }
        Update: {
          admin_notes?: string | null
          asking_price?: number | null
          created_at?: string | null
          customer_email?: string
          customer_name?: string
          customer_telegram?: string
          id?: string
          item_category?: string | null
          item_description?: string
          item_name?: string
          status?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
