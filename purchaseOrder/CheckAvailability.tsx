import * as React from 'react';
import * as styled from './PurchaseOrder.styles';
import { Select } from 'antd';
import { RouteComponentProps } from 'react-router-dom';
import { Content } from '../content/Content';
import { EmailPurchaseOrderCard } from '../proposal/emails/EmailPurchaseOrderCard';
import { groupBy } from 'lodash';
import moment from 'moment';
import { OrderBuisnessType } from 'schema-types';
import { ProposalItemType, PurchaseOrdersType, CFlightLegsType } from 'global-types';

const VistaJetlogo = require('client/assets/images/VistaJetlogo.svg');
const vistajetlogo = require('client/assets/images/vistajet-logo.svg');
const color = '#393939';
const styleCaslonPro = {
    fontFamily: 'ACaslonPro-Regular',
    color,
};
const styleCaslonProBold = {
    fontFamily: 'ACaslonPro-Bold',
    color,
};
const styleMinion = {
    fontFamily: 'MinionPro-Regular',
    color,
};
const styleCaslonSC = {
    fontFamily: 'ACaslonSC-Regular',
    color,
};

interface Props extends RouteComponentProps {
    taskId: string;
    data: ProposalItemType[];
}

enum ActiveRadio {
    MSTask = 'MSTask',
    Email = 'Email',
}

interface HandlingType {
    handlingAgent: string;
    tel: string;
    permit: string;
}

interface State {
    activeRadio?: ActiveRadio;
    data: ProposalItemType[];
    isUSA?: boolean;
    isIndia?: boolean;
    isLimited?: boolean;
    purchaseOrders: PurchaseOrdersType;
    flight: CFlightLegsType;
    handlingDetails: HandlingType;
    isMicrowave: boolean;
}

const Option = Select.Option;

class CheckAvailability extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            purchaseOrders: {
                coreId: 'PO1',
                purchaseOrderNotes: 'PONote',
                modifiedBy: {
                    firstName: 'Dart',
                    lastName: 'Vader',
                    coreId: 'sith1',
                },
                modifiedAt: moment(new Date()),
                removed: false,
                serviceProvider: {
                    company: {
                        name: 'ACME',
                    },
                    addresses: 'West Str 8',
                    emails: 'acme@gmail.com',
                    phoneNumbers: '101-113-777',
                },
                delivery: {
                    coreId: 'delivery1',
                    deliveryTime: {
                        localTime: '14:30 loc',
                        deliveryDate: moment(new Date()).format('DD-MMM-YYYY'),
                    },
                    handlingCharge: 260,
                    handlingCurrency: {
                        coreId: 'handCur1',
                        code: 'USD',
                        name: 'US Dollar',
                        symbol: '$',
                    },
                    deliveryCharge: 300,
                    deliveryCurrency: {
                        coreId: 'delCur1',
                        code: 'USD',
                    },
                    deliveryChargeable: true,
                    handlingChargeable: true,
                    specialNote: 'Special Note',
                },
            },
            flight: {
                id: 'flight01',
                coreId: 'flight01',
                aircraft: {
                    aircraftType: {
                        displayName: 'Challenger 350',
                        name: 'Challenger 350',
                        code: '6000',
                    },
                    coreId: 'Air1',
                    tailNumber: '9H-VCA',
                },
                legOperationalType: {
                    coreId: 'legOperation01',
                    name: 'International Leg',
                },
                legOperationalStatus: {
                    coreId: 'legOperation01',
                    name: 'International Leg',
                },
                arrivalAirport: {
                    coreId: 'airport01',
                    name: 'Dubai',
                    icao: 'OMDB',
                    cateringAirportName: 'Dubai',
                },
                arrivalAirportServiceProvider: {
                    company: {
                        name: 'Azure24',
                    },
                },
                previousAirport: null,
                scheduledArrival: '24-07-2019 19:00',
                estimatedArrival: '2h',
                departureAirport: {
                    coreId: 'airport02',
                    name: 'Liverpool',
                    icao: 'EGGP',
                    cateringAirportName: 'Liverpool',
                },
                departureAirportServiceProvider: {
                    company: {
                        name: 'Azure48',
                    },
                },
                scheduledDeparture: '24-07-2019 12:00',
                estimatedDeparture: '4h',
                flightOrder: {
                    coreId: 'flightOrder01',
                    customerName: 'Dinner',
                    type: OrderBuisnessType.AMBULANCE,
                },
                flightPreferences: 'More fruits',
                expectedPaxNumber: 4,
                crews: [
                    {
                        coreId: 'crew01',
                        crewMemberCode: '001',
                        crewRole: {
                            abbreviation: null,
                            customerFacingName: null,
                        },
                        person: {
                            coreId: 'pers01',
                            firstName: 'John',
                            middleName: 'Older',
                            lastName: 'Anderson',
                            salutation: 'Dear Sir',
                            phones: ['+ 044 394 230'],
                            emails: ['mail@mail.com'],
                            isActive: true,
                        },
                    },
                ],
                passengers: [
                    {
                        coreId: 'pass01',
                        person: {
                            coreId: 'pers01',
                            firstName: 'John',
                            middleName: 'Older',
                            lastName: 'Anderson',
                            salutation: 'Dear Sir',
                            dateOfBirth: '1974-09-02T00:00:00.000Z',
                            gender: {
                                coreId: 'gen1',
                                name: 'Male',
                                description: 'Male',
                                isActive: true,
                            },
                            nationalities: ['British', 'Schotish'],
                            preferences: [
                                {
                                    coreId: 'pref01',
                                    category: {
                                        coreId: 'cat01',
                                        name: 'd',
                                    },
                                    name: 'Billy',
                                },
                            ],
                            isActive: true,
                        },
                        isLead: null,
                        relationship: {
                            coreId: 'rel01',
                            name: 'relaty',
                        },
                    },
                ],
            },
            handlingDetails: {
                handlingAgent: 'Contra_Costa',
                tel: '+ 044 4443 2314',
                permit: '12346439602C',
            },
            isMicrowave: false,
            isUSA: false,
            isIndia: false,
            isLimited: true,
            data: [
                {
                    visible: true,
                    createdBy: null,
                    customerNotes: 'some',
                    modifiedAt: null,
                    modifiedBy: null,
                    originalPriceItem: {
                        coreId: 'opi1',
                        priceList: {
                            coreId: 'pl1',
                            currency: {
                                code: 'USD',
                                coreId: 'c1',
                                name: 'US Dollar',
                                symbol: '',
                            },
                            name: 'price list 1',
                        },
                    },
                    id: 'id1',
                    coreId: 'PI1',
                    price: 20.15,
                    name: 'priceItem1',
                    description: 'description1',
                    note: 'super',
                    chargeable: true,
                    unit: {
                        coreId: 'e9025c03-9619-4026-b9fc-a3384ce63dd0',
                        description: null,
                        name: 'Piece',
                    },
                    cuisine: {
                        coreId: '3d85fb41-1160-4e0c-8334-e344625d90a3',
                        name: 'Vietnamese',
                    },
                    dietaryPreferences: [
                        {
                            coreId: '5b6e7a72-4592-4391-8ce9-76a745a7be79',
                            name: 'Glatt Kosher',
                        },
                    ],
                    cateringCategory: {
                        coreId: '6',
                        rank: 6,
                        description: null,
                        name: 'Platters',
                    },
                    ingredients: [
                        {
                            coreId: '087bf911-362f-41db-ae7f-de2759ad233c',
                            name: 'Peanuts',
                            isAllergen: false,
                        },
                    ],
                    quantity: 18,
                },
                {
                    visible: true,
                    createdBy: null,
                    customerNotes: 'some',
                    modifiedAt: null,
                    modifiedBy: null,
                    originalPriceItem: {
                        coreId: 'opi1',
                        priceList: {
                            coreId: 'pl1',
                            currency: {
                                code: 'USD',
                                coreId: 'c1',
                                name: 'US Dollar',
                                symbol: '',
                            },
                            name: 'price list 1',
                        },
                    },
                    id: 'id2',
                    coreId: 'PI2',
                    price: 30,
                    name: 'priceItem2',
                    description: 'description2',
                    note: 'super2',
                    chargeable: true,
                    unit: {
                        coreId: 'f421c270-5ebf-44d6-8ca7-d0347a2ec20d',
                        name: 'Portion',
                        description: 'Portion',
                    },
                    cateringCategory: {
                        description: 'Breakfast',
                        coreId: '13',
                        rank: 13,
                        name: 'Breakfast',
                    },
                    ingredients: [
                        {
                            coreId: 'ing1',
                            name: 'Eggs',
                            isAllergen: false,
                        },
                    ],
                    cuisine: {
                        coreId: 'cuis1',
                        name: 'Italian',
                    },
                    dietaryPreferences: [
                        {
                            coreId: '5b6e7a72-4592-4391-8ce9-76a745a7be79',
                            name: 'Glatt Kosher',
                        },
                    ],
                    quantity: 20,
                },
            ],
        };
    }

    public closeContentHandle = () => null;

    public onChangeLimited() {
        this.setState({ ...this.state, isLimited: true, isUSA: false, isIndia: false });
    }

    public onChangeUSA() {
        this.setState({ ...this.state, isLimited: false, isUSA: true, isIndia: false });
    }

    public onChangeIndia() {
        this.setState({ ...this.state, isLimited: false, isUSA: false, isIndia: true });
    }

    public onChangePDF(value) {
        if (value === 'Limited') {
            return this.onChangeLimited();
        } else if (value === 'USA') {
            return this.onChangeUSA();
        } else {
            return this.onChangeIndia();
        }
    }

    public onChange(e) {
        console.log(`radio checked:${e.target.value}`);
        this.setState({
            activeRadio: e.target.value.toString(),
        });
    }

    public renderHeadContainer() {
        const { purchaseOrders } = this.state;
        return (
            <div
                className="HeadContainer"
                style={{
                    marginTop: '180px',
                    margin: 'auto',
                    width: '90%',
                }}
            >
                {this.renderPicture()}
                <div
                    className="DocName"
                    style={{
                        fontSize: '30px',
                        textAlign: 'center',
                        backgroundColor: '#efefef',
                    }}
                >
                    <div style={styleCaslonPro}>Catering Purchase Order</div>
                    <div style={styleCaslonPro}>
                        Order <span style={styleMinion}>№</span>
                        {purchaseOrders.coreId}
                    </div>
                </div>
            </div>
        );
    }

    public renderPicture() {
        const { isUSA, isLimited } = this.state;
        if (isUSA) {
            return (
                <img
                    src={VistaJetlogo}
                    alt="VistaJet logo"
                    style={{
                        width: '200px',
                        height: '70px',
                        marginLeft: '250px',
                        marginTop: '20px',
                        marginBottom: '20px',
                    }}
                />
            );
        } else if (isLimited) {
            return (
                <img
                    src={vistajetlogo}
                    alt="VistaJet logo"
                    style={{
                        width: '250px',
                        height: '70px',
                        marginLeft: '230px',
                        marginTop: '20px',
                        marginBottom: '20px',
                    }}
                />
            );
        } else {
            return (
                <img
                    src={VistaJetlogo}
                    alt="VistaJet logo"
                    style={{
                        width: '200px',
                        height: '70px',
                        marginLeft: '250px',
                        marginTop: '20px',
                        marginBottom: '20px',
                    }}
                />
            );
        }
    }

    public renderFlightInfo() {
        const {
            purchaseOrders: {
                delivery: { deliveryTime },
            },
            flight: { aircraft, arrivalAirport, passengers },
        } = this.state;
        return (
            <div
                className="FlightInfo"
                style={{
                    backgroundColor: '#efefef',
                    padding: '4px',
                }}
            >
                <table
                    style={{
                        width: '100%',
                    }}
                >
                    <tbody>
                        <tr
                            style={{
                                textAlign: 'left',
                            }}
                        >
                            <td style={{ paddingLeft: '5px', fontFamily: 'ACaslonPro-Regular', color }}>
                                Date Of Delivery
                            </td>
                            <td style={styleCaslonPro}>Delivery Airport</td>
                            <td style={styleCaslonPro}>Delivery Time</td>
                            <td style={styleCaslonPro}>
                                Aircraft Tail <span style={styleMinion}>№</span>
                            </td>
                            <td style={styleCaslonPro}>Pax</td>
                        </tr>
                        <tr
                            style={{
                                textAlign: 'left',
                            }}
                        >
                            <td
                                style={{
                                    paddingLeft: '5px',
                                    fontFamily: 'ACaslonSC-Regular',
                                    color,
                                }}
                            >
                                {deliveryTime.deliveryDate}
                            </td>
                            <td style={styleCaslonSC}>
                                {arrivalAirport.name}
                                {arrivalAirport.icao}
                            </td>
                            <td style={styleCaslonSC}>{deliveryTime.localTime}</td>
                            <td style={styleCaslonSC}>{aircraft.aircraftType.displayName}</td>
                            <td style={styleCaslonSC}>{passengers.length}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }

    public renderOpJetAviation() {
        return (
            <div style={{ padding: '4px' }}>
                <div style={styleCaslonProBold}>Operated by Jet Aviation</div>
                <div
                    style={{
                        padding: '8px 0',
                        fontFamily: 'ACaslonSC-Regular',
                        color,
                    }}
                >
                    VJUS HAS BEEN AUTHORIZED TO PLACE THIS CATERING ORDER ON BEHALF OF A DULY LICENSED U.S. AIR CARRIER
                    OR AS AGENT OF THE CLIENT DEPENDING ON THE SELECTED SERVICES. PLEASE SEE INVOICE DETAILS BELOW.
                </div>
            </div>
        );
    }

    public renderHotDishes() {
        if (!this.state.isMicrowave) {
            return (
                <p style={styleCaslonSC}>
                    All hot dishes in{' '}
                    <span
                        style={{
                            color: 'red',
                            fontFamily: 'ACaslonSC-Regular',
                        }}
                    >
                        TINFOIL
                    </span>{' '}
                    containers to be reheated in a convection oven.
                </p>
            );
        } else {
            return (
                <p style={styleCaslonSC}>
                    All hot dishes in{' '}
                    <span
                        style={{
                            color: 'red',
                            fontFamily: 'ACaslonSC-Regular',
                        }}
                    >
                        MICROWAVE
                    </span>{' '}
                    suitable packaging.
                </p>
            );
        }
    }

    public renderFreeText() {
        const { isUSA, isLimited } = this.state;
        if (isUSA) {
            return (
                <p
                    style={{
                        color: 'red',
                        fontFamily: 'ACaslonSC-Regular',
                    }}
                >
                    Please refer to the attached document for the Full Catering Purchase Order All prices below are in
                    the agreed currency between Supplier {'&'} VistaJet ("USD")
                </p>
            );
        } else if (isLimited) {
            return (
                <p
                    style={{
                        color: 'red',
                        fontFamily: 'ACaslonSC-Regular',
                    }}
                >
                    Please refer to the attached document for the Full Catering Purchase Order All prices below are in
                    the agreed currency between Supplier {'&'} VistaJet ("EUR")
                </p>
            );
        } else {
            return '';
        }
    }

    public renderSpecialNotes() {
        const {
            isUSA,
            purchaseOrders: { delivery },
            flight: { aircraft },
        } = this.state;
        if (isUSA) {
            return (
                <div
                    className="SpecialNotes"
                    style={{
                        borderStyle: 'groove',
                        borderColor: '#d2d2d2',
                        marginTop: '10px',
                        padding: '5px',
                    }}
                >
                    {this.renderOpJetAviation()}
                    <div
                        className="Title"
                        style={{
                            fontSize: '18px',
                            fontFamily: 'ACaslonPro-Regular',
                            color,
                        }}
                    >
                        Special Notes
                    </div>
                    <div
                        className="Text"
                        style={{
                            padding: '8px',
                            fontFamily: 'ACaslonSC-Regular',
                            color,
                        }}
                    >
                        {delivery.specialNote}
                    </div>
                    <div
                        className="Title"
                        style={{
                            fontSize: '18px',
                            fontFamily: 'ACaslonPro-Regular',
                            color,
                        }}
                    >
                        Important Information
                    </div>
                    <div
                        className="Text"
                        style={{
                            padding: '8px',
                            fontFamily: 'ACaslonSC-Regular',
                            color,
                        }}
                    >
                        <p style={styleCaslonSC}>Aircraft: {aircraft.aircraftType.displayName}</p>
                        {this.renderHotDishes()}
                        <p style={styleCaslonSC}>
                            If the requested packaging is not available - see attachment - please inform VJ private
                            dining department before proceeding with the order. Orders need to be acknowledged via email
                            within 2 hours after receipt with a price breakdown. Final confirmation needs to be sent via
                            email ONLY when availability of all items are confirmed. The cost of the whole order must be
                            approved by private dining team BEFORE proceeding.
                        </p>
                        <p style={styleCaslonSC}>
                            For any item that needs to be produced or picked up more than 12 hours before delivery, VJ
                            private dining team must be notified. We always guarantee the freshness to our clients and
                            it might be the case we will prefer an alternative item instead.
                        </p>
                        <p style={styleCaslonSC}>
                            Pay close attention to the NOTES in each order that may contain special instructions on how
                            items are to be packed, allergies and special dietary requirements.
                        </p>
                        {this.renderFreeText()}
                    </div>
                </div>
            );
        } else {
            return (
                <div
                    className="SpecialNotes"
                    style={{
                        borderStyle: 'groove',
                        borderColor: '#d2d2d2',
                        marginTop: '10px',
                        padding: '5px',
                    }}
                >
                    <div
                        className="Title"
                        style={{
                            fontSize: '18px',
                            fontFamily: 'ACaslonPro-Regular',
                            color,
                        }}
                    >
                        Special Notes
                    </div>
                    <div
                        className="Text"
                        style={{
                            padding: '8px',
                            fontFamily: 'ACaslonSC-Regular',
                            color,
                        }}
                    >
                        {delivery.specialNote}
                    </div>
                    <div
                        className="Title"
                        style={{
                            fontSize: '18px',
                            fontFamily: 'ACaslonPro-Regular',
                            color,
                        }}
                    >
                        Important Information
                    </div>
                    <div
                        className="Text"
                        style={{
                            padding: '8px',
                            fontFamily: 'ACaslonSC-Regular',
                            color,
                        }}
                    >
                        <p style={styleCaslonSC}>Aircraft: {aircraft.aircraftType.displayName}</p>
                        {this.renderHotDishes()}
                        <p style={styleCaslonSC}>
                            If the requested packaging is not available - see attachment - please inform VJ private
                            dining department before proceeding with the order. Orders need to be acknowledged via email
                            within 2 hours after receipt with a price breakdown. Final confirmation needs to be sent via
                            email ONLY when availability of all items are confirmed. The cost of the whole order must be
                            approved by private dining team BEFORE proceeding.
                        </p>
                        <p style={styleCaslonSC}>
                            For any item that needs to be produced or picked up more than 12 hours before delivery, VJ
                            private dining team must be notified. We always guarantee the freshness to our clients and
                            it might be the case we will prefer an alternative item instead.
                        </p>
                        <p style={styleCaslonSC}>
                            Pay close attention to the NOTES in each order that may contain special instructions on how
                            items are to be packed, allergies and special dietary requirements.
                        </p>
                        {this.renderFreeText()}
                    </div>
                </div>
            );
        }
    }

    public renderItem = item => {
        return (
            <tr key={item.coreId}>
                <td
                    style={{
                        width: '35px',
                        height: '50px',
                        borderBottomWidth: '3px',
                        borderBottomStyle: 'ridge',
                        verticalAlign: 'top',
                        fontFamily: 'ACaslonSC-Regular',
                        color,
                    }}
                >
                    {item.quantity}
                </td>
                <td
                    style={{
                        width: '73px',
                        height: '50px',
                        borderBottomWidth: '3px',
                        borderBottomStyle: 'ridge',
                        verticalAlign: 'top',
                        fontFamily: 'ACaslonSC-Regular',
                        color,
                    }}
                >
                    {item.unit.name}
                </td>
                <td
                    style={{
                        width: '223px',
                        height: '50px',
                        borderBottomWidth: '3px',
                        borderBottomStyle: 'ridge',
                        verticalAlign: 'top',
                        fontFamily: 'ACaslonSC-Regular',
                        color,
                    }}
                >
                    {item.name}
                    <p
                        style={{
                            fontFamily: 'ACaslonSC-Regular',
                            color,
                            fontStyle: 'italic',
                        }}
                    >
                        {item.description}
                    </p>
                </td>
                <td
                    style={{
                        width: '210px',
                        height: '50px',
                        borderBottomWidth: '3px',
                        borderBottomStyle: 'ridge',
                        verticalAlign: 'top',
                        fontFamily: 'ACaslonSC-Regular',
                        color,
                    }}
                >
                    {item.note}
                </td>
                <td
                    style={{
                        width: '65px',
                        height: '50px',
                        borderBottomWidth: '3px',
                        borderBottomStyle: 'ridge',
                        textAlign: 'right',
                        verticalAlign: 'top',
                        fontFamily: 'ACaslonSC-Regular',
                        color,
                    }}
                >
                    {item.price}
                </td>
                <td
                    style={{
                        width: '65px',
                        height: '50px',
                        borderBottomWidth: '3px',
                        borderBottomStyle: 'ridge',
                        textAlign: 'right',
                        verticalAlign: 'top',
                        fontFamily: 'ACaslonSC-Regular',
                        color,
                    }}
                >
                    {item.price * item.quantity}
                </td>
            </tr>
        );
    };

    public renderGroup = (name, list) => {
        return (
            <div key={name}>
                <div
                    className="SheetName"
                    style={{
                        fontSize: '16px',
                        width: '100%',
                        height: 'auto',
                        borderBottomRadius: '2px',
                        borderBottomColor: '#a1a1a1',
                        borderBottomWidth: '4px',
                        borderBottomStyle: 'ridge',
                        marginBottom: '20px',
                        fontFamily: 'ACaslonPro-Regular',
                        color,
                    }}
                >
                    {name}
                </div>
                <div
                    style={{
                        marginBottom: '25px',
                        marginLeft: '16px',
                    }}
                >
                    <table>
                        <tbody>{list.map(item => this.renderItem(item))}</tbody>
                    </table>
                </div>
            </div>
        );
    };

    public renderGroupedItems = list => {
        const groups = groupBy(list, 'cateringCategory.name');
        return <div>{Object.entries(groups).map(i => this.renderGroup(i[0], i[1]))}</div>;
    };

    public renderOrderRequest() {
        return (
            <div
                className="OrderRequest"
                style={{
                    borderStyle: 'groove',
                    borderColor: '#d2d2d2',
                    marginTop: '10px',
                    padding: '10px',
                }}
            >
                <div
                    className="Title"
                    style={{
                        fontSize: '18px',
                        marginBottom: '16px',
                        fontFamily: 'ACaslonPro-Regular',
                        color,
                    }}
                >
                    Order Request
                </div>
                <div
                    className="HeadLine"
                    style={{
                        marginBottom: '25px',
                    }}
                >
                    <table>
                        <tbody>
                            <tr
                                style={{
                                    marginLeft: '4px',
                                }}
                            >
                                <td
                                    style={{
                                        width: '45px',
                                        fontFamily: 'ACaslonSC-Regular',
                                        paddingLeft: '5px',
                                        color,
                                    }}
                                >
                                    Qty
                                </td>
                                <td
                                    style={{
                                        width: '80px',
                                        fontFamily: 'ACaslonSC-Regular',
                                        color,
                                    }}
                                >
                                    Unit
                                </td>
                                <td
                                    style={{
                                        width: '220px',
                                        fontFamily: 'ACaslonSC-Regular',
                                        color,
                                    }}
                                >
                                    Name/Description
                                </td>
                                <td
                                    style={{
                                        width: '210px',
                                        fontFamily: 'ACaslonSC-Regular',
                                        color,
                                    }}
                                >
                                    Notes
                                </td>
                                <td
                                    style={{
                                        width: '65px',
                                        fontFamily: 'ACaslonSC-Regular',
                                        color,
                                    }}
                                >
                                    Unit Cost
                                </td>
                                <td
                                    style={{
                                        width: '65px',
                                        fontFamily: 'ACaslonSC-Regular',
                                        color,
                                    }}
                                >
                                    Total Cost
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div>{this.renderGroupedItems(this.state.data)}</div>
            </div>
        );
    }

    public renderTotalCostContainer(items) {
        const {
            purchaseOrders: {
                delivery: { deliveryCharge, handlingCharge, deliveryCurrency, handlingCurrency },
            },
        } = this.state;
        const total = items.reduce((acc, cur) => acc + cur.price * cur.quantity, 0);
        const grandTotal = total + deliveryCharge + handlingCharge;
        return (
            <div
                className="TotalCosts"
                style={{
                    borderStyle: 'groove',
                    borderColor: '#d2d2d2',
                    marginTop: '10px',
                    padding: '10px',
                }}
            >
                <div
                    className="Title"
                    style={{
                        fontSize: '18px',
                        fontFamily: 'ACaslonPro-Regular',
                        color,
                    }}
                >
                    Total Costs
                </div>
                <table
                    style={{
                        width: '100%',
                        marginBottom: '5px',
                    }}
                >
                    <tbody>
                        <tr>
                            <td style={styleCaslonSC}>Catering Charges</td>
                            <td
                                style={{
                                    textAlign: 'right',
                                    paddingRight: '15px',
                                    fontFamily: 'ACaslonSC-Regular',
                                    color,
                                }}
                            >
                                {total} {deliveryCurrency.code}
                            </td>
                        </tr>
                        <tr>
                            <td style={styleCaslonSC}>Additional Delivery Charges</td>
                            <td
                                style={{
                                    textAlign: 'right',
                                    paddingRight: '15px',
                                    fontFamily: 'ACaslonSC-Regular',
                                    color,
                                }}
                            >
                                {deliveryCharge}
                                {deliveryCurrency.code}
                            </td>
                        </tr>
                        <tr>
                            <td style={styleCaslonSC}>Additional Handling Charges</td>
                            <td
                                style={{
                                    textAlign: 'right',
                                    paddingRight: '15px',
                                    fontFamily: 'ACaslonSC-Regular',
                                    color,
                                }}
                            >
                                {handlingCharge}
                                {handlingCurrency.code}
                            </td>
                        </tr>
                        <tr
                            style={{
                                fontWeight: 'bold',
                                backgroundColor: '#efefef',
                            }}
                        >
                            <td style={styleCaslonSC}>Grand Total</td>
                            <td
                                style={{
                                    textAlign: 'right',
                                    paddingRight: '15px',
                                    fontFamily: 'ACaslonSC-Regular',
                                    color,
                                }}
                            >
                                {grandTotal} {deliveryCurrency.code}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }

    public renderHandlingContainer() {
        const {
            flight: { departureAirport },
            handlingDetails,
        } = this.state;
        return (
            <div
                className="HandlingAgentPermissions"
                style={{
                    borderStyle: 'groove',
                    borderColor: '#d2d2d2',
                    marginTop: '10px',
                    padding: '5px',
                }}
            >
                <div
                    className="Title"
                    style={{
                        fontSize: '18px',
                        fontFamily: 'ACaslonPro-Regular',
                        color,
                    }}
                >
                    Handling Agent {`&`} Permissions
                </div>
                <table
                    style={{
                        width: '100%',
                        marginBottom: '5px',
                    }}
                >
                    <tbody>
                        <tr
                            style={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                            }}
                        >
                            <td
                                style={{
                                    width: '120px',
                                    fontFamily: 'ACaslonPro-Bold',
                                    color,
                                }}
                            >
                                Airport
                            </td>
                            <td
                                style={{
                                    width: '190px',
                                    fontFamily: 'ACaslonPro-Bold',
                                    color,
                                }}
                            >
                                Handling Agent
                            </td>
                            <td
                                style={{
                                    width: '120px',
                                    fontFamily: 'ACaslonPro-Bold',
                                    color,
                                }}
                            >
                                Tel
                            </td>
                            <td style={styleCaslonProBold}>PPR - Permit</td>
                        </tr>
                        <tr>
                            <td
                                style={{
                                    width: '120px',
                                    fontFamily: 'ACaslonSC-Regular',
                                }}
                            >
                                {departureAirport.name} {departureAirport.icao}
                            </td>
                            <td
                                style={{
                                    width: '190px',
                                    fontFamily: 'ACaslonSC-Regular',
                                    color,
                                }}
                            >
                                {handlingDetails.handlingAgent}
                            </td>
                            <td
                                style={{
                                    width: '120px',
                                    fontFamily: 'ACaslonSC-Regular',
                                    color,
                                }}
                            >
                                {handlingDetails.tel}
                            </td>
                            <td style={styleCaslonSC}>{handlingDetails.permit}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }

    public renderConactDetails() {
        const { isUSA, isIndia } = this.state;
        if (isUSA) {
            return (
                <div
                    className="ContactDetails"
                    style={{
                        borderStyle: 'groove',
                        borderColor: '#d2d2d2',
                        marginTop: '10px',
                        padding: '5px',
                    }}
                >
                    <div
                        className="Title"
                        style={{
                            fontSize: '18px',
                            fontFamily: 'ACaslonPro-Regular',
                            color,
                        }}
                    >
                        Contact Details
                    </div>
                    <table
                        style={{
                            width: '100%',
                            marginBottom: '5px',
                        }}
                    >
                        <tbody>
                            <tr>
                                <td
                                    style={{
                                        width: '180px',
                                        fontFamily: 'ACaslonSC-Regular',
                                        color,
                                    }}
                                >
                                    Private Dining Department
                                </td>
                                <td
                                    style={{
                                        width: '260px',
                                        fontFamily: 'ACaslonSC-Regular',
                                        color,
                                    }}
                                >
                                    1-646-844-7469
                                </td>
                                <td
                                    style={{
                                        width: '120px',
                                        fontFamily: 'ACaslonSC-Regular',
                                        color,
                                    }}
                                >
                                    privatediningus@vistajet.com
                                </td>
                            </tr>
                            <tr>
                                <td
                                    style={{
                                        width: '180px',
                                        fontFamily: 'ACaslonSC-Regular',
                                        color,
                                    }}
                                >
                                    Accounting Department
                                </td>
                                <td
                                    style={{
                                        width: '260px',
                                        fontFamily: 'ACaslonSC-Regular',
                                        color,
                                    }}
                                >
                                    VistaJet US Inc.
                                </td>
                                <td
                                    style={{
                                        width: '120px',
                                        fontFamily: 'ACaslonSC-Regular',
                                        color,
                                    }}
                                >
                                    1-646-609-1683
                                    <p style={styleCaslonSC}>USAP@vistajet.com</p>
                                </td>
                            </tr>
                            <tr>
                                <td
                                    style={{
                                        width: '180px',
                                        fontFamily: 'ACaslonSC-Regular',
                                        color,
                                    }}
                                >
                                    Operator Details
                                </td>
                                <td
                                    style={{
                                        width: '260px',
                                        fontFamily: 'ACaslonSC-Regular',
                                        color,
                                    }}
                                >
                                    Jet Aviation Flight Services Inc., 112 Charles A. Lindbergh Dr., Teterboro, NJ
                                    07608.
                                </td>
                                <td
                                    style={{
                                        width: '120px',
                                        fontFamily: 'ACaslonSC-Regular',
                                        color,
                                    }}
                                />
                            </tr>
                        </tbody>
                    </table>
                </div>
            );
        } else if (isIndia) {
            return (
                <div
                    className="ContactDetails"
                    style={{
                        borderStyle: 'groove',
                        borderColor: '#d2d2d2',
                        marginTop: '10px',
                        padding: '5px',
                    }}
                >
                    <div
                        className="Title"
                        style={{
                            fontSize: '18px',
                            fontFamily: 'ACaslonPro-Regular',
                            color,
                        }}
                    >
                        Contact Details
                    </div>
                    <table
                        style={{
                            width: '100%',
                            marginBottom: '5px',
                        }}
                    >
                        <tbody>
                            <tr>
                                <td
                                    style={{
                                        width: '180px',
                                        fontFamily: 'ACaslonSC-Regular',
                                        color,
                                    }}
                                >
                                    Private Dining Department
                                </td>
                                <td
                                    style={{
                                        width: '260px',
                                        fontFamily: 'ACaslonSC-Regular',
                                        color,
                                    }}
                                >
                                    +44 (0) 203 617 3108
                                </td>
                                <td
                                    style={{
                                        width: '120px',
                                        fontFamily: 'ACaslonSC-Regular',
                                        color,
                                    }}
                                >
                                    privatedining@vistajet.com
                                </td>
                            </tr>
                            <tr>
                                <td
                                    style={{
                                        width: '180px',
                                        fontFamily: 'ACaslonSC-Regular',
                                        color,
                                    }}
                                >
                                    Accounting Department
                                </td>
                                <td
                                    style={{
                                        width: '260px',
                                        fontFamily: 'ACaslonSC-Regular',
                                        color,
                                    }}
                                >
                                    TBC
                                </td>
                                <td
                                    style={{
                                        width: '120px',
                                        fontFamily: 'ACaslonSC-Regular',
                                        color,
                                    }}
                                >
                                    accounting@vistajet.com
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            );
        } else {
            return (
                <div
                    className="ContactDetails"
                    style={{
                        borderStyle: 'groove',
                        borderColor: '#d2d2d2',
                        marginTop: '10px',
                        padding: '5px',
                    }}
                >
                    <div
                        className="Title"
                        style={{
                            fontSize: '18px',
                            fontFamily: 'ACaslonPro-Regular',
                            color,
                        }}
                    >
                        Contact Details
                    </div>
                    <table
                        style={{
                            width: '100%',
                            marginBottom: '5px',
                        }}
                    >
                        <tbody>
                            <tr>
                                <td
                                    style={{
                                        width: '180px',
                                        fontFamily: 'ACaslonSC-Regular',
                                        color,
                                    }}
                                >
                                    Private Dining Department
                                </td>
                                <td
                                    style={{
                                        width: '260px',
                                        fontFamily: 'ACaslonSC-Regular',
                                        color,
                                    }}
                                >
                                    +44 (0) 203 617 3108
                                </td>
                                <td
                                    style={{
                                        width: '120px',
                                        fontFamily: 'ACaslonSC-Regular',
                                        color,
                                    }}
                                >
                                    privatedining@vistajet.com
                                </td>
                            </tr>
                            <tr>
                                <td
                                    style={{
                                        width: '180px',
                                        fontFamily: 'ACaslonSC-Regular',
                                        color,
                                    }}
                                >
                                    Accounting Department
                                </td>
                                <td
                                    style={{
                                        width: '260px',
                                        fontFamily: 'ACaslonSC-Regular',
                                        color,
                                    }}
                                >
                                    TBC
                                </td>
                                <td
                                    style={{
                                        width: '120px',
                                        fontFamily: 'ACaslonSC-Regular',
                                        color,
                                    }}
                                >
                                    accounting@vistajet.com
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            );
        }
    }

    public renderDiffPayment() {
        const { isUSA, isIndia, purchaseOrders } = this.state;
        if (isUSA) {
            return (
                <tbody>
                    <tr>
                        <td
                            style={{
                                width: '50%',
                                verticalAlign: 'top',
                                fontFamily: 'ACaslonSC-Regular',
                                color,
                            }}
                        >
                            Billing Reference :
                        </td>
                        <td style={styleCaslonSC}>{purchaseOrders.coreId}</td>
                    </tr>
                    <tr>
                        <td
                            style={{
                                width: '50%',
                                verticalAlign: 'top',
                                fontFamily: 'ACaslonSC-Regular',
                                color,
                            }}
                        >
                            Billing Address :
                        </td>
                        <td style={styleCaslonSC}>
                            VistaJet US Inc., 120 Wooster Street, 6th Floor, New York, NY, 10012, United States Email
                            invoice to: USAP@vistajet.com
                        </td>
                    </tr>
                    <tr>
                        <td
                            style={{
                                width: '50%',
                                verticalAlign: 'top',
                                fontFamily: 'ACaslonSC-Regular',
                                color,
                            }}
                        >
                            Company :
                        </td>
                        <td style={styleCaslonSC}>46-4207651</td>
                    </tr>
                    <tr>
                        <td
                            style={{
                                width: '50%',
                                verticalAlign: 'top',
                                fontFamily: 'ACaslonSC-Regular',
                                color,
                            }}
                        >
                            VAT :
                        </td>
                        <td style={styleCaslonSC}>n/a</td>
                    </tr>
                </tbody>
            );
        } else if (isIndia) {
            return (
                <tbody>
                    <tr>
                        <td
                            style={{
                                width: '50%',
                                verticalAlign: 'top',
                                fontFamily: 'ACaslonSC-Regular',
                                color,
                            }}
                        >
                            Billing Reference :
                        </td>
                        <td style={styleCaslonSC}>{purchaseOrders.coreId}</td>
                    </tr>
                    <tr>
                        <td
                            style={{
                                width: '50%',
                                verticalAlign: 'top',
                                fontFamily: 'ACaslonSC-Regular',
                                color,
                            }}
                        >
                            Billing Address :
                        </td>
                        <td style={styleCaslonSC}>
                            VistaJet India Private Limited 901. 9th Floor Shiv Shakti Apartment, Vastu Lane Sundervan,
                            Andheri-West, Mumbai 400056, Maharashtra, India
                        </td>
                    </tr>
                    <tr>
                        <td
                            style={{
                                width: '50%',
                                verticalAlign: 'top',
                                fontFamily: 'ACaslonSC-Regular',
                                color,
                            }}
                        >
                            Company :
                        </td>
                        <td style={styleCaslonSC}>U63030MH2018FTC305989</td>
                    </tr>
                    <tr>
                        <td
                            style={{
                                width: '50%',
                                verticalAlign: 'top',
                                fontFamily: 'ACaslonSC-Regular',
                                color,
                            }}
                        >
                            GSTIN :
                        </td>
                        <td style={styleCaslonSC}>27AAGCV3151N1ZY</td>
                    </tr>
                </tbody>
            );
        } else {
            return (
                <tbody>
                    <tr>
                        <td
                            style={{
                                width: '50%',
                                verticalAlign: 'top',
                                fontFamily: 'ACaslonSC-Regular',
                                color,
                            }}
                        >
                            Billing Reference :
                        </td>
                        <td style={styleCaslonSC}>{purchaseOrders.coreId}</td>
                    </tr>
                    <tr>
                        <td
                            style={{
                                width: '50%',
                                verticalAlign: 'top',
                                fontFamily: 'ACaslonSC-Regular',
                                color,
                            }}
                        >
                            Billing Address :
                        </td>
                        <td style={styleCaslonSC}>
                            VistaJet Limited, SkyParks Business Centre, Malta International Airport, Luqa, LQA 4000,
                            MALTA
                        </td>
                    </tr>
                    <tr>
                        <td
                            style={{
                                width: '50%',
                                verticalAlign: 'top',
                                fontFamily: 'ACaslonSC-Regular',
                                color,
                            }}
                        >
                            Company :
                        </td>
                        <td style={styleCaslonSC}>C55231</td>
                    </tr>
                    <tr>
                        <td
                            style={{
                                width: '50%',
                                verticalAlign: 'top',
                                fontFamily: 'ACaslonSC-Regular',
                                color,
                            }}
                        >
                            VAT :
                        </td>
                        <td style={styleCaslonSC}>MT 20728332</td>
                    </tr>
                </tbody>
            );
        }
    }

    public renderPaymentDetails() {
        return (
            <div
                className="PaymentDetails"
                style={{
                    borderStyle: 'groove',
                    borderColor: '#d2d2d2',
                    marginTop: '10px',
                    padding: '5px',
                }}
            >
                <div
                    className="Title"
                    style={{
                        fontSize: '18px',
                        fontFamily: 'ACaslonPro-Regular',
                        color,
                    }}
                >
                    Payment Details
                </div>
                <table
                    style={{
                        width: '100%',
                        marginBottom: '5px',
                    }}
                >
                    {this.renderDiffPayment()}
                </table>
            </div>
        );
    }

    public renderDiffConfirmationDetails() {
        const {
            isLimited,
            purchaseOrders: { modifiedBy, modifiedAt },
        } = this.state;
        if (isLimited) {
            return (
                <div
                    className="Text"
                    style={{
                        padding: '8px',
                        fontFamily: 'ACaslonSC-Regular',
                        color,
                    }}
                >
                    <p style={styleCaslonSC}>
                        This VisteJet Limited ("VistaJet") Catering Purchase Order ("CPO") is generated by the VistaJet
                        Private Dining Department on {moment(modifiedAt).format('DD-MMM-YYYY')} by{' '}
                        {modifiedBy.firstName}
                        {modifiedBy.lastName}
                        and reflects the prices agreed between Supplier {'&'} VistaJet.
                    </p>
                    <p style={styleCaslonSC}>
                        By commencing delivery of the Items listed in the Order Request and/or by sending a CPO
                        confirmation to the VistaJet Private Dining Department (privatedining@vistajet.com), the
                        Supplier agrees to deliver those items in accordance with this VistaJet CPO. Deliver date(s) and
                        time(s) stated in this CPO are of the essence. Following delivery of the items, VistaJet will
                        settle the Supplier's undisputed invoice relating to those Items within thirty (30) days of
                        receipt of invoice.
                    </p>
                    <p style={styleCaslonSC}>
                        Following receipt of this CPO, the Supplier will use best endeavours to comply with any
                        subsequent amendment(s) to this CPO as communicated by VistaJet to the Supplier by way of an
                        amendment document. English law and jurisdiction govern this CPO.
                    </p>
                    <p style={styleCaslonSC}>English law and jurisdiction govern this CPO.</p>
                    <p
                        style={{
                            color: 'red',
                            fontStyle: 'italic',
                            fontFamily: 'ACaslonSC-Regular',
                        }}
                    >
                        For all flights departing from an EU/EEA country and from Switzerland the food and drink items
                        supplied to VistaJet must each be accompanied by the written information or labelling on
                        allergenic ingredients, as required by the EU Food Information for Consumers Regulation No.
                        1169/2011. [VistaJet reserve the right to reject and/or cancel any order, or part there of,
                        which is not so accompanied, at no cost to VistaJet.]
                    </p>
                </div>
            );
        } else {
            return (
                <div
                    className="Text"
                    style={{
                        padding: '8px',
                        fontFamily: 'ACaslonSC-Regular',
                        color,
                    }}
                >
                    <p style={styleCaslonSC}>
                        This Catering Purchase Order ("CPO") placed on {moment(modifiedAt).format('DD-MMM-YYYY')}
                        by {modifiedBy.firstName}
                        {modifiedBy.lastName} reflects the agreed prices.
                    </p>
                    <p style={styleCaslonSC}>
                        By commencing delivery of the Items listed in the Order Request and/or by sending a CPO
                        confirmation, the Supplier agrees to deliver those items in accordance with this CPO. Delivery
                        date(s) and time(s) stated in this CPO are of the essence. Following delivery of the items, the
                        Supplier's undisputed invoice will be settled relating to those Items within thirty (30) days of
                        receipt of invoice. Following receipt of this CPO, the Supplier will use best endeavours to
                        comply with any subsequent amendment(s) to this CPO as communicated to the Supplier by way of an
                        amendment document.
                    </p>
                    <p
                        style={{
                            color: 'red',
                            fontStyle: 'italic',
                            fontFamily: 'ACaslonSC-Regular',
                        }}
                    >
                        For all flights departing from an EU/EEA country and from Switzerland the food and drink items
                        supplied must each be accompanied by the written information or labelling on allergenic
                        ingredients, as required by the EU Food Information for Consumers Regulation No. 1169/2011. The
                        Carrier reserves the right to reject and/or cancel any order, or part thereof, which is not so
                        accompanied, at no cost to the Carrier.
                    </p>
                </div>
            );
        }
    }

    public renderConfirmationDetails() {
        return (
            <div
                className="ConfirmationDetails"
                style={{
                    borderStyle: 'groove',
                    borderColor: '#d2d2d2',
                    marginTop: '10px',
                    padding: '5px',
                }}
            >
                <div
                    className="Title"
                    style={{
                        fontSize: '18px',
                        fontFamily: 'ACaslonPro-Regular',
                        color,
                    }}
                >
                    Confirmation Details
                </div>
                {this.renderDiffConfirmationDetails()}
            </div>
        );
    }

    public renderAuthor() {
        const {
            purchaseOrders: { modifiedBy },
        } = this.state;
        return (
            <div
                className="Author"
                style={{
                    marginTop: '30px',
                }}
            >
                <p
                    style={{
                        margin: '0',
                        fontFamily: 'ACaslonSC-Regular',
                        color,
                    }}
                >
                    Kind regards,
                </p>
                <p style={styleCaslonSC}>
                    {modifiedBy.firstName} {modifiedBy.lastName}
                </p>
            </div>
        );
    }

    public renderPSContainer() {
        const { isUSA, isIndia } = this.state;
        if (isUSA) {
            return (
                <div
                    className="P.S."
                    style={{
                        textAlign: 'center',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        fontSize: '10px',
                    }}
                >
                    <p
                        style={{
                            margin: '0',
                            fontFamily: 'ACaslonSC-Regular',
                            color,
                        }}
                    >
                        VistaJet US Inc., 120 Wooster Street, 6th Floor, New York, New York 10012, United States
                    </p>
                    <p
                        style={{
                            margin: '0',
                            fontFamily: 'ACaslonSC-Regular',
                            color,
                        }}
                    >
                        T: +1 800 793 5985 - americas@vistajet.com - www.vistajet.com/us
                    </p>
                    <p
                        style={{
                            marginBottom: '30px',
                            fontFamily: 'ACaslonSC-Regular',
                            color,
                        }}
                    >
                        VistaJet US Inc is not a direct or indirect carrier. Air transportation will be operated by one
                        or more licensed carriers.
                    </p>
                </div>
            );
        } else if (isIndia) {
            return (
                <div
                    className="P.S."
                    style={{
                        textAlign: 'center',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        fontSize: '10px',
                    }}
                >
                    <p
                        style={{
                            margin: '0',
                            fontFamily: 'ACaslonSC-Regular',
                            color,
                        }}
                    >
                        VistaJet India Private Limited is not a direct or indirect carrier. Air transportation will be
                        operated by one or more licensed carriers,
                    </p>
                    <p
                        style={{
                            margin: '0',
                            fontFamily: 'ACaslonSC-Regular',
                            color,
                        }}
                    >
                        VistaJet India Private Limited, 901. 9th Floor Shiv Shakti Apartment, Vastu Lane, Sundervan,
                        Andheri-West, Mumbai 400056, Maharashtra, India
                    </p>
                    <p
                        style={{
                            margin: '0',
                            fontFamily: 'ACaslonSC-Regular',
                            color,
                        }}
                    >
                        Company Registration Details: U63030MH2018FTC305989
                    </p>
                    <p
                        style={{
                            margin: '0',
                            fontFamily: 'ACaslonSC-Regular',
                            color,
                        }}
                    >
                        Phone T: +91-22-33033190 |Sales T: +44 (0) 203 617 3106 |Finance T: +44 (0) 1252 526 645
                    </p>
                    <p
                        style={{
                            marginBottom: '30px',
                            fontFamily: 'ACaslonSC-Regular',
                            color,
                        }}
                    >
                        customerservice@vistajet.com | www.vistajet.com
                    </p>
                </div>
            );
        } else {
            return (
                <div
                    className="P.S."
                    style={{
                        textAlign: 'center',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        fontSize: '10px',
                    }}
                >
                    <p
                        style={{
                            margin: '0',
                            fontFamily: 'ACaslonSC-Regular',
                            color,
                        }}
                    >
                        VistaJet Limited, SkyParks Business Centre, Malta International Airport, Luqa, LQA 4000, MALTA
                    </p>
                    <p
                        style={{
                            margin: '0',
                            fontFamily: 'ACaslonSC-Regular',
                            color,
                        }}
                    >
                        Fax: +44 (0) 203 725 7832 | Sales t: +44 (0) 203 617 3106 | Finance t: +44 (0) 1252 526 645 -
                        customerservice@vistajet.com | www.vistajet.com
                    </p>
                    <p
                        style={{
                            marginBottom: '30px',
                            fontFamily: 'ACaslonSC-Regular',
                            color,
                        }}
                    >
                        C55231 - MT 20728332
                    </p>
                </div>
            );
        }
    }

    public renderPdf() {
        const {
            purchaseOrders: { serviceProvider },
        } = this.state;
        return (
            <div
                className="MainContainer"
                style={{
                    // maxHeight: '1100px',
                    width: '778px',
                    backgroundColor: '#fff',
                    height: 'auto',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                }}
            >
                {this.renderHeadContainer()}
                <div
                    className="BodyContainer"
                    style={{
                        margin: 'auto',
                        paddingTop: '30px',
                        width: '88%',
                        fontFamily: 'ACaslonSC-Regular',
                        color,
                    }}
                >
                    {serviceProvider.company.name} ("Supplier")
                    <div
                        className="EmailAdress"
                        style={{
                            marginBottom: '10px',
                            fontFamily: 'ACaslonSC-Regular',
                            color,
                        }}
                    >
                        E: {serviceProvider.emails}
                    </div>
                    {this.renderFlightInfo()}
                    {this.renderSpecialNotes()}
                    {this.renderOrderRequest()}
                    {this.renderTotalCostContainer(this.state.data)}
                    {this.renderHandlingContainer()}
                    {this.renderConactDetails()}
                    {this.renderPaymentDetails()}
                    {this.renderConfirmationDetails()}
                    {this.renderAuthor()}
                    {this.renderPSContainer()}
                </div>
            </div>
        );
    }

    public render() {
        const { taskId } = this.props;
        const { isLimited = 'isLimited' } = this.state;
        const { isUSA = 'isUSA' } = this.state;
        const { isIndia = 'isIndia' } = this.state;
        return (
            <Content taskId={taskId}>
                {{
                    header: (
                        <React.Fragment>
                            <styled.Wrapper>
                                <styled.WrapperTools>
                                    <styled.Text>Check Availability</styled.Text>
                                    <styled.Select defaultValue="Choose">
                                        <styled.Option value={isLimited}>
                                            <styled.Text>V2</styled.Text>
                                            <styled.SelectText>(21 Jun 13:00, Angel Lyons)</styled.SelectText>
                                        </styled.Option>
                                        <styled.Option value={isUSA}>
                                            <styled.Text>V3</styled.Text>
                                            <styled.SelectText>(22 Jun 13:00, Los Angeles)</styled.SelectText>
                                        </styled.Option>
                                        <styled.Option value={isIndia}>
                                            <styled.Text>V4</styled.Text>
                                            <styled.SelectText>(22 Jun 13:00, Los Angeles)</styled.SelectText>
                                        </styled.Option>
                                    </styled.Select>
                                </styled.WrapperTools>
                                <styled.WrapperTools>
                                    <Select
                                        style={{ width: '160px' }}
                                        placeholder="Select Company"
                                        optionFilterProp="children"
                                        onChange={value => this.onChangePDF(value)}
                                    >
                                        <Option value="Limited">Limited</Option>
                                        <Option value="USA">USA</Option>
                                        <Option value="India">India</Option>
                                    </Select>
                                    <styled.ReloadButton>
                                        <styled.ReloadIcon type="sync" />
                                    </styled.ReloadButton>
                                    <styled.SavePdfButton type="primary" icon="file-pdf">
                                        Save PDF
                                    </styled.SavePdfButton>
                                </styled.WrapperTools>
                            </styled.Wrapper>
                        </React.Fragment>
                    ),
                    pdf: <styled.PDFWrapper>{this.renderPdf()}</styled.PDFWrapper>,
                    sider: (
                        <styled.Card>
                            <styled.CardHeader>Food</styled.CardHeader>
                            <EmailPurchaseOrderCard
                                {...{ cc: undefined, to: undefined, subject: '', body: '', customerName: '' }}
                            />
                        </styled.Card>
                    ),
                }}
            </Content>
        );
    }
}

export default CheckAvailability;
