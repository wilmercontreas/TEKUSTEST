// get all subs
export interface GetSubscribersResponse {
    Count?: number;
    Data?:  Subscriber[];
    Message?: string;
}

// get one sub
export interface Subscriber {
    SystemId?:                     null | string;
    Area?:                         string;
    PublicId?:                     number;
    CountryCode?:                  CountryCode;
    CountryName?:                  CountryName;
    Name?:                         string;
    EndpointsCount?:               number;
    Email?:                        string;
    JobTitle?:                     string;
    PhoneNumber?:                  string;
    PhoneCode?:                    string;
    PhoneCodeAndNumber?:           string;
    LastActivityUtc?:              null;
    LastActivity?:                 null;
    LastActivityString?:           null;
    SubscriptionDate?:             null;
    SubscriptionMethod?:           number;
    SubscriptionState?:            number;
    SubscriptionStateDescription?: SubscriptionStateDescription;
    Topics?:                       any[];
    ValidEmail?:                   boolean;
    Activity?:                     Activity;
    ConnectionState?:              number;
    Id?:                           number;
    Message?: string;
    error?: string;
}

// add subs
export interface AddSubscribersResponse {
    Name?:        string;
    Email?:       string;
    PhoneNumber?: null;
    Id?:          number;
    Message?: string;
}

// update sub
export interface UpdateSubscribersResponse {
    Message?: string;
    error?: string;
}

// delete sub
export interface DeleteSubscriberResponse {
    message?: string;
    error?: string;
}


export enum Activity {
    Empty = "--",
}

export enum CountryCode {
    CA = "CA",
    Co = "CO",
    Us = "US",
}

export enum CountryName {
    Canada = "Canada",
    Colombia = "Colombia",
    UnitedStates = "United States",
}

export enum SubscriptionStateDescription {
    Pendiente = "Pendiente",
}
