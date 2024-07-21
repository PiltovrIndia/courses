export const calculateFeedback = async (isMarked: any, topicId: any) => {
    var feedback: any[] = [];
    let studentTopicCount = 0;
    let confidence = -1;
    let understand = -1;
    let implementation = -1;
  
    const fetchFeedbackData = async () => {
      const url = `/api/instructor/get-feedback/${topicId}`;
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        const resp = await response.json();
        if (response.status === 200) {
          console.log("Feedback retrieval successful!", resp.data);
          feedback = resp.data;
          calConfidence(resp.data);
          calUnderstand(resp.data);
        } else {
          console.error("Feedback retrieval failed!");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
  
    const fetchImplementation = async () => {
      const url = `/api/instructor/get-topic-students/${topicId}`;
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        const resp = await response.json();
        if (response.status === 200) {
          console.log("Registered students count!", resp.data);
          studentTopicCount = resp.data;
          calImplementation();
        } else {
          console.error("Registered students count retrieval failed!");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
  
    if (isMarked) {
      await fetchFeedbackData();
      await fetchImplementation();
      implementation = Math.floor((feedback.length / studentTopicCount) * 100);
    } else {
      console.log("Topic not completed");
    }
  
    const calConfidence = (data: any) => {
      const len = data.length;
      let confidenceSum = 0;
      for (let i = 0; i < len; i++) confidenceSum += data[i].confidence;
      let avgPercentile = ((confidenceSum /  len) / 5)*100 ;
      confidence = avgPercentile;
    };
  
    const calUnderstand = (data: any) => {
      let ycnt = 0;
      let mcnt = 0;
      const len = data.length;
      for (let i = 0; i < len; i++) {
        if (data[i].understand === "yes") ycnt++;
        else if(data[i].understand === "may-be") mcnt++;
      }
      understand = Math.floor(((ycnt + mcnt*0.5) / len) * 100);
    };
  
    const calImplementation = () => {
      implementation = Math.floor((feedback.length / studentTopicCount) * 100);
      console.log(implementation);
    };
  
    await fetchFeedbackData();
    await fetchImplementation();
    let respondantsCount = feedback.length;
    // console.log(implementation, understand, confidence);
    return { understand, implementation, confidence,studentTopicCount,respondantsCount };
  };
  