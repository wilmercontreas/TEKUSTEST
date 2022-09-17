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
    CountryCode?:                  string;
    CountryName?:                  string;
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
    SubscriptionStateDescription?: string;
    Topics?:                       any[];
    ValidEmail?:                   boolean;
    Activity?:                     string;
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

export interface AddSubscribers {
    Subscribers?: Subscriber[];
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

// countries 
export interface GetCountriesResponse {
    Count?: number;
    Data?:  Countries[];
}

export interface Countries {
    Code?:      string;
    Code3?:     null | string;
    Name?:      string;
    PhoneCode?: null | string;
}
