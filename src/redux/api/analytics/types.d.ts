/* eslint-disable @typescript-eslint/no-unused-vars */
namespace ANALYTIC {
    type Analytic = {
      id: number;
      year: number;
      userGain: number;
      userLost: number;
    };
    type AnalyticsResponse = Analytic[];
    type AnalyticsRequest = void;
  }
  