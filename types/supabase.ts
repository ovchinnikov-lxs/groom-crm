export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      Breed: {
        Row: {
          company_id: string | null
          created_at: string
          description: string | null
          id: string
          image: string | null
          name: string
        }
        Insert: {
          company_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image?: string | null
          name: string
        }
        Update: {
          company_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image?: string | null
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "Breed_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "Company"
            referencedColumns: ["id"]
          }
        ]
      }
      Company: {
        Row: {
          created_at: string
          end_access_date: string | null
          id: string
          name: string | null
          tariff_id: string
        }
        Insert: {
          created_at?: string
          end_access_date?: string | null
          id?: string
          name?: string | null
          tariff_id: string
        }
        Update: {
          created_at?: string
          end_access_date?: string | null
          id?: string
          name?: string | null
          tariff_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "Company_tariff_id_fkey"
            columns: ["tariff_id"]
            isOneToOne: false
            referencedRelation: "Tariff"
            referencedColumns: ["id"]
          }
        ]
      }
      Profile: {
        Row: {
          avatar: string | null
          company_id: string
          created_at: string
          description: string | null
          full_name: string | null
          id: string
          role: Database["public"]["Enums"]["Roles"]
          salary: number | null
          status: Database["public"]["Enums"]["ProfileStatuses"]
        }
        Insert: {
          avatar?: string | null
          company_id: string
          created_at?: string
          description?: string | null
          full_name?: string | null
          id: string
          role?: Database["public"]["Enums"]["Roles"]
          salary?: number | null
          status?: Database["public"]["Enums"]["ProfileStatuses"]
        }
        Update: {
          avatar?: string | null
          company_id?: string
          created_at?: string
          description?: string | null
          full_name?: string | null
          id?: string
          role?: Database["public"]["Enums"]["Roles"]
          salary?: number | null
          status?: Database["public"]["Enums"]["ProfileStatuses"]
        }
        Relationships: [
          {
            foreignKeyName: "Profile_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "Company"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Profile_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      Salon: {
        Row: {
          avatar: string | null
          close_at: string
          company_id: string | null
          created_at: string
          id: string
          location: Json | null
          name: string
          open_at: string
          price: number | null
        }
        Insert: {
          avatar?: string | null
          close_at: string
          company_id?: string | null
          created_at?: string
          id?: string
          location?: Json | null
          name: string
          open_at: string
          price?: number | null
        }
        Update: {
          avatar?: string | null
          close_at?: string
          company_id?: string | null
          created_at?: string
          id?: string
          location?: Json | null
          name?: string
          open_at?: string
          price?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "Salon_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "Company"
            referencedColumns: ["id"]
          }
        ]
      }
      ServiceBreed: {
        Row: {
          breed_id: string
          id: string
          service_id: string
        }
        Insert: {
          breed_id: string
          id?: string
          service_id: string
        }
        Update: {
          breed_id?: string
          id?: string
          service_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ServiceBreed_breed_id_fkey"
            columns: ["breed_id"]
            isOneToOne: false
            referencedRelation: "Breed"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ServiceBreed_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "ServiceDetail"
            referencedColumns: ["id"]
          }
        ]
      }
      ServiceCategory: {
        Row: {
          company_id: string | null
          created_at: string
          description: string | null
          id: string
          image: string | null
          name: string
        }
        Insert: {
          company_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image?: string | null
          name: string
        }
        Update: {
          company_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image?: string | null
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "ServiceCategory_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "Company"
            referencedColumns: ["id"]
          }
        ]
      }
      ServiceDetail: {
        Row: {
          category_id: string
          company_id: string
          created_at: string
          description: string | null
          duration: number
          id: string
          image: string | null
          name: string
          price: number
        }
        Insert: {
          category_id: string
          company_id: string
          created_at?: string
          description?: string | null
          duration: number
          id?: string
          image?: string | null
          name: string
          price: number
        }
        Update: {
          category_id?: string
          company_id?: string
          created_at?: string
          description?: string | null
          duration?: number
          id?: string
          image?: string | null
          name?: string
          price?: number
        }
        Relationships: [
          {
            foreignKeyName: "ServiceDetail_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "ServiceCategory"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ServiceDetail_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "Company"
            referencedColumns: ["id"]
          }
        ]
      }
      Staff: {
        Row: {
          id: string
          salon_id: string
          user_id: string
        }
        Insert: {
          id?: string
          salon_id: string
          user_id: string
        }
        Update: {
          id?: string
          salon_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "Staff_salon_id_fkey"
            columns: ["salon_id"]
            isOneToOne: false
            referencedRelation: "Salon"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Staff_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "Profile"
            referencedColumns: ["id"]
          }
        ]
      }
      Tariff: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          price: number
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          price: number
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          price?: number
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
      ProfileStatuses: "pending" | "active" | "blocked" | "unavailable"
      Roles: "owner" | "admin" | "master"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
