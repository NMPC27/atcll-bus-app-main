
export function RoadsData (str){
    switch (str) {
        case "p1_1": return p1_1();
        case "p1_2": return p1_2();
        case "p3_1": return p3_1();
        case "p3_2": return p3_2();
        case "p30_1": return p30_1();
        case "p30_2": return p30_2();
        case "p33_1": return p33_1();
        case "p33_2": return p33_2();
        case "p35_1": return p35_1();
        case "p35_2": return p35_2();

        default:    console.log("RoadsData: No data for this road: "+str);
                    return null;
    }

}

function p1_1(){
  const data=[{
      latitude: 40.637755,
      longitude: -8.658587,
    }, {
      latitude: 40.635896,
      longitude:  -8.659696,
    }, {
      latitude: 40.634850,
      longitude: -8.660415,
    }, {
      latitude: 40.633449,
      longitude:  -8.661294,
    }, {
      latitude: 40.631983,
      longitude:  -8.661880,
    }, {
      latitude: 40.631462,
      longitude:  -8.661869,
    }, {
      latitude: 40.630921,
      longitude:  -8.661590,
    }, {
      latitude: 40.630522,
      longitude:  -8.661231,
    }, {
      latitude: 40.629561,
      longitude:  -8.659895,
    }
  ];

  return data;
}

function p1_2(){
    const data=[{
        latitude: 40.637755,
        longitude: -8.658637,
      }, {
        latitude: 40.635896,
        longitude:  -8.659746,
      }, {
        latitude: 40.634864,
        longitude: -8.660455,
      }, {
        latitude: 40.633449,
        longitude:  -8.661344,
      }, {
        latitude: 40.631983,
        longitude:  -8.661930,
      }, {
        latitude: 40.631462,
        longitude:  -8.661919,
      }, {
        latitude: 40.630921,
        longitude:  -8.661640,
      }, {
        latitude: 40.630522,
        longitude:  -8.661281,
      }, {
        latitude: 40.629503,
        longitude:  -8.659951,
      }
    ];

    return data;
}

function p3_1(){
    const data=[{
        latitude: 40.641880,
        longitude: -8.658346,
      }, {
        latitude: 40.641687,
        longitude:  -8.657940,
      }, {
        latitude: 40.641460,
        longitude:  -8.657713,
      }, {
        latitude: 40.640902,
        longitude: -8.657182,
      }, {
        latitude: 40.640769,
        longitude: -8.656897,
      }, {
        latitude: 40.640726,
        longitude:  -8.656664,
      }, {
        latitude: 40.640757,
        longitude:  -8.656244,
      }, {
        latitude: 40.641007,
        longitude:  -8.655651,
      }, {
        latitude: 40.641221,
        longitude:  -8.654412,
      }, {
        latitude: 40.641229,
        longitude:   -8.653870,
      }
    ];
    
    return data;
}

function p3_2(){
    const data=[{
        latitude: 40.641930,
        longitude: -8.658346,
      }, {
        latitude: 40.641737,
        longitude:  -8.657940,
      }, {
        latitude: 40.641510,
        longitude:  -8.657713,
      }, {
        latitude: 40.640952,
        longitude: -8.657182,
      }, {
        latitude: 40.640819,
        longitude: -8.656897,
      }, {
        latitude: 40.640776,
        longitude:  -8.656664,
      }, {
        latitude: 40.640807,
        longitude:  -8.656244,
      }, {
        latitude: 40.641057,
        longitude:  -8.655651,
      }, {
        latitude: 40.641271,
        longitude:  -8.654412,
      }, {
        latitude: 40.641279,
        longitude:   -8.653870,
      }
    ];
    
    return data;
}

function p30_1(){
    const data=[{
        latitude: 40.634327,
        longitude: -8.643922,
      },
      {
        latitude: 40.634474,
        longitude: -8.644692,
      },
      {
        latitude: 40.634574,
        longitude: -8.644889,
      }, {
        latitude: 40.638662,
        longitude:  -8.650021,
      }, {
        latitude: 40.638830,
        longitude:  -8.650209,
      }, {
        latitude: 40.638920,
        longitude:  -8.650365,
      }
    ];
    
    return data;
}

function p30_2(){
    const data=[{
        latitude: 40.634357,
        longitude: -8.643922,
      },
      {
        latitude: 40.634504,
        longitude: -8.644692,
      },
      {
        latitude: 40.634604,
        longitude: -8.644889,
      }, {
        latitude: 40.638692,
        longitude:  -8.650021,
      }, {
        latitude: 40.638860,
        longitude:  -8.650209,
      }, {
        latitude: 40.638978,
        longitude:  -8.650295,
      }
    ];
    
    return data;
}

function p33_1(){
    const data=[{
        latitude: 40.633050,
        longitude: -8.648622,
      },
      {
        latitude: 40.627483,
        longitude: -8.647792,
      }
    ];
    
    return data;
}

function p33_2(){
    const data=[{
        latitude: 40.633050,
        longitude: -8.648572,
      },
      {
        latitude: 40.627483,
        longitude: -8.647742,
      }
    ];
    
    return data;
}

function p35_1(){
    const data=[{
        latitude: 40.630418,
        longitude: -8.654190,
      },
      {
        latitude: 40.627913,
        longitude: -8.652644,
      },{
        latitude: 40.627588,
        longitude: -8.652486,
      },{
        latitude: 40.626121,
        longitude: -8.652022,
      },{
        latitude: 40.625812,
        longitude: -8.651871,
      },{
        latitude: 40.625316,
        longitude: -8.651410,
      },{
        latitude: 40.624920,
        longitude: -8.650758,
      }
    ];
    
    return data;
}

function p35_2(){
    const data=[{
        latitude: 40.630479,
        longitude: -8.654004,
      },
      {
        latitude: 40.627769,
        longitude: -8.652444,
      },{
        latitude: 40.626187,
        longitude: -8.651898,
      },{
        latitude: 40.625830,
        longitude: -8.651697,
      },{
        latitude: 40.625471,
        longitude: -8.651364,
      },{
        latitude: 40.625108,
        longitude: -8.650865,
      }
    ];
    
    return data;
}



