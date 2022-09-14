export interface LoginResponse {
    Status?:                number;
    Token?:                 string;
    Message?:               null;
    TwoFactorType?:         null;
    AllowedTwoFactorTypes?: null;
    Permissions?:           Permission[];
    Features?:              Feature[];
    Locations?:             any[];
    LastLocationId?:        number;
    Preferences?:           Preference[];
    UserType?:              string;
    Email?:                 string;
    FirstName?:             string;
    LastName?:              string;
    CompanyName?:           string;
    TimeZoneInfo?:          null;
    RefreshToken?:          string;
    error?: string;
}

export interface User {
    UserName?: string;
    Password?: string;
}

export interface Feature {
    M?: string;
    F?: string;
}

export interface Permission {
    M?: string;
    D?: string;
}

export interface Preference {
    PreferenceKey?:   string;
    PreferenceValue?: string;
}
