import React, { useState, useEffect } from "react";
import { View, Platform, Text, ScrollView } from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import { SvgXml } from "react-native-svg";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Flatlist } from "react-native";

import { Spacer } from "../utillities/spacer/spacer.component";
import star from "../../assets/star";
import {
  ProductDetailView,
  Title,
  WorkingHoursSection,
  ProductHeader,
  RatingSection,
  Rating,
  Category,
  SectionSeparator,
  ReservationSection,
  Description,
  DateTimeButton,
  DateTimeSection,
  DateTimeText,
  SubmitButton,
} from "../data/styles/product-detail.styles";
import { Review } from "../data/components/review.component";
import { setReservationByUser } from "../services/reservation.service";
import { Alert } from "react-native";
import { getReviewsByProduct } from "../services/review.service";
import {
  ReviewSection,
  StarsSection,
} from "../data/styles/product-detail.styles";

export const ProductDetailScreen = ({ route }) => {
  const { product } = route.params;

  const [reservationDate, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [isEmpty, setEmpty] = useState(true);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function fetchData() {
      console.log(product);
      const data = await getReviewsByProduct(product);
      if (data) {
        setReviews(data);
        setEmpty(false);
      } else {
        Alert.alert("No reviews data");
      }
    }

    fetchData();
  }, [product]);

  const ratingArray = Array.from(new Array(Math.floor(product.rate)));

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || reservationDate;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const handleSubmit = () => {
    try {
      setReservationByUser(reservationDate, product);
      Alert.alert("Successfully reserved!");
    } catch (e) {
      Alert.alert(e);
    }
  };

  return (
    <View>
      <ScrollView>
        <SliderBox
          images={product.image}
          dotColor="gold"
          inactiveDotColor="black"
          imageLoadingColor="gold"
        />
        <Spacer size="large" />
        <ProductDetailView>
          <ProductHeader>
            <Title>{product.name}</Title>
            <RatingSection>
              <SvgXml xml={star} width={30} height={30} />
              <Rating>{product.rate}</Rating>
            </RatingSection>
          </ProductHeader>
          <Spacer size="medium" />
          <Category>{product.category}</Category>
          <Spacer size="small" />
          <WorkingHoursSection>
            <Category>
              {product.opening_at}-{product.closed_at}
            </Category>
          </WorkingHoursSection>
          <Spacer size="small" />
          <Category>{product.address}</Category>
          <Spacer size="small" />
          <Description>{product.description}</Description>
          <Spacer size="large" />
          <Spacer size="large" />
        </ProductDetailView>
        <SectionSeparator />
        <Spacer size="large" />
        <Spacer size="large" />
        <ReservationSection>
          <DateTimeSection>
            <DateTimeButton
              onPress={showDatepicker}
              mode="contained"
              textColor="black"
              buttonColor="gold"
            >
              Select Date
            </DateTimeButton>
            <Spacer size="medium" />
            <DateTimeButton
              onPress={showTimepicker}
              mode="contained"
              textColor="black"
              buttonColor="gold"
            >
              Select Time
            </DateTimeButton>
          </DateTimeSection>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={reservationDate}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
          <Spacer size="medium" />
          <DateTimeText>{reservationDate.toLocaleString()}</DateTimeText>
          <Spacer size="large" />
          <Spacer size="large" />
          <SubmitButton
            onPress={handleSubmit}
            mode="contained"
            textColor="black"
            buttonColor="gold"
          >
            Reserve
          </SubmitButton>
        </ReservationSection>
        <Spacer size="large" />
        <Spacer size="large" />
        <SectionSeparator />
        <Spacer size="large" />
        <Spacer size="large" />
        {isEmpty && <Text>No Reservations yet</Text>}
        <ReviewSection>
          <StarsSection>
            {ratingArray.map((_, i) => (
              <SvgXml
                key={`star-${product.id}-${i}`}
                xml={star}
                width={30}
                height={30}
              />
            ))}
          </StarsSection>
        </ReviewSection>
      </ScrollView>
    </View>
  );
};
