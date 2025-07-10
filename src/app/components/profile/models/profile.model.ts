export interface Order {
    address: string;
    business_id: number;
    business_name: string;
    count_in_period: number;
    created_at: string;
    customer_id: number;
    id: number;
    number_completed_tasks: number;
    period: number;
    platform: string;
    price: string;
    rate: number;
    rate_count: number;
    receipt: string | null;
    status: string;
    task_count: number;
  }
  
  export interface GetOrdersResponse {
    orders: Order[];
    status: string;
  }

  export interface GetBalanceResponse {
    balance: string;
    status: string;
    message?: string;
}

export interface Organization {
    address: string;
    customer_id: number;
    id: number;
    name: string;
    org_id: string;
    platform: string; // "2gis" или "yandex"
    rate: number;
    rate_count: number;
    rubrics: string;
}

export interface GetOrganizationsResponse {
    data: Organization[];
    status: string;
    message?: string;
}