import React, {useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import Rain from '../assests/rain.png';
import EarthQuake from '../assests/earthquake.png';
import Flood from '../assests/flood.png';
import Fire from '../assests/fire.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import Logo from '../assests/Logo.png';
import BottomContainer from '../components/BottomContainer.jsx'; // Adjust extensions as needed
import Disaster from '../assests/disaster.png';

interface Section {
  icon: Object;
  title: string;
  content: string;
}

const SECTIONS: Section[] = [
  {
    icon: Rain,
    title: 'Rain Precautions',
    content: `    ✔ Always carry an umbrella or raincoat.

    ✔ Wear appropriate footwear to avoid slipping.

    ✔ Stay indoors during heavy rainstorms.

    ✔ Be cautious of flooded areas and avoid walking or driving through them.

    ✔ Keep emergency contacts handy.`,
  },
  {
    icon: EarthQuake,
    title: 'Earthquake Precautions',
    content: `    ✔ Drop down to your hands and knees to prevent being knocked over.
    
    ✔ Take cover under a sturdy piece of furniture and hold on until shaking stops.

    ✔ Stay away from windows, glass, and exterior walls.

    ✔ If outdoors, move to an open area away from buildings, trees, streetlights, and utility wires.

    ✔ If in a vehicle, pull over to a safe location, stop, and stay inside until the shaking stops.`,
  },
  {
    icon: Flood,
    title: 'Flood Precautions',
    content: `    ✔ Evacuate immediately if instructed to do so by authorities.

    ✔ Follow designated evacuation routes and avoid walking or driving through flooded areas.

    ✔ Move to higher ground and avoid basements or lower floors if you're unable to evacuate.

    ✔ Listen to emergency alerts and instructions from local authorities through radio, TV, or mobile alerts.

    ✔ Avoid contact with floodwater, which may be contaminated with sewage, chemicals, or debris.

    ✔ Turn off utilities such as gas, electricity, and water to prevent electrical hazards and water damage.

    ✔ Keep emergency supplies, including food, water, medications, and a battery-powered radio, readily accessible.`,
  },
  {
    icon: Fire,
    title: 'Fire Precautions',
    content: `    ✔ If you discover a fire, alert others by shouting "Fire!" and activate the nearest fire alarm if available.

    ✔ Immediately evacuate the building using the nearest safe exit, closing doors behind you to slow the spread of fire and smoke.

    ✔ Stay low to the ground where the air is clearer and cover your nose and mouth with a cloth if possible.

    ✔ Test doorknobs before opening doors. If a doorknob is hot, do not open the door; find another exit.

    ✔ If your clothing catches fire, stop, drop to the ground, cover your face with your hands, and roll to smother the flames.

    ✔ Once outside, go to the designated meeting point and call emergency services to report the fire.`,
  },
];

const FIRST_AID_SECTIONS: Section[] = [
  {
    icon: Disaster, // Placeholder icon; replace if needed
    title: 'First Aid for Cuts and Wounds',
    content: `    ✔ For cuts and wounds, clean the area with water and apply an antiseptic. Cover with a sterile bandage.`,
  },
  {
    icon: Disaster, // Placeholder icon; replace if needed
    title: 'First Aid for Burns',
    content: `    ✔ For burns, cool the burn under running cold water for at least 10 minutes. Do not apply ice or butter. Cover with a clean, non-stick dressing.`,
  },
  {
    icon: Disaster, // Placeholder icon; replace if needed
    title: 'First Aid for Sprains and Strains',
    content: `    ✔ For sprains and strains, apply ice to the injured area and elevate it. Use a bandage to provide compression if needed.`,
  },
  {
    icon: Disaster, // Placeholder icon; replace if needed
    title: 'First Aid for Choking',
    content: `    ✔ For choking, perform abdominal thrusts (Heimlich maneuver) if the person is conscious. If unconscious, perform CPR.`,
  },
  {
    icon: Disaster, // Placeholder icon; replace if needed
    title: 'First Aid for Allergic Reactions',
    content: `    ✔ For allergic reactions, administer an epinephrine injection if prescribed and seek emergency medical help.`,
  },
  {
    icon: Disaster, // Placeholder icon; replace if needed
    title: 'First Aid for Unconsciousness',
    content: `    ✔ For unconsciousness, ensure the person is lying on their side to prevent choking and seek medical assistance immediately.`,
  },
];

const Precautions = ({navigation}) => {
  const [activeSections, setActiveSections] = useState<number[]>([]);
  const [activeFirstAidSections, setActiveFirstAidSections] = useState<
    number[]
  >([]);

  const renderHeader = (section: Section) => {
    return (
      <View style={styles.header}>
        <Image style={styles.listImage} source={section.icon} />
        <Text style={styles.titleText}>{section.title}</Text>
      </View>
    );
  };

  const renderContent = (section: Section) => {
    return (
      <View style={styles.content}>
        <Text style={styles.contentText}>{section.content}</Text>
      </View>
    );
  };

  const updateSections = (sections: number[]) => {
    setActiveSections(sections);
  };

  const updateFirstAidSections = (sections: number[]) => {
    setActiveFirstAidSections(sections);
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.topbarContainer}>
          <View>
            <Text style={styles.fontHome}>Precautions</Text>
          </View>
          <View style={styles.sideContainer}>
            <Icon
              style={styles.search}
              name="search"
              size={14}
              color="#000000"
            />
            <Image style={styles.logoImage} source={Logo} />
          </View>
        </View>
        <View>
          <Text style={styles.sectionTitle}>Precautions</Text>
          <Accordion
            sections={SECTIONS}
            activeSections={activeSections}
            renderHeader={renderHeader}
            renderContent={renderContent}
            onChange={updateSections}
          />
        </View>
        <View style={{marginTop: 20}}>
          <Text style={styles.sectionTitle}>First Aid Guidelines</Text>
          <Accordion
            sections={FIRST_AID_SECTIONS}
            activeSections={activeFirstAidSections}
            renderHeader={renderHeader}
            renderContent={renderContent}
            onChange={updateFirstAidSections}
          />
        </View>
      </ScrollView>
      <BottomContainer navigation={navigation} />
    </>
  );
};

export default Precautions;

const styles = StyleSheet.create({
  topbarContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fontHome: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  sideContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
  },
  logoImage: {
    width: 50,
    height: 30,
  },
  search: {
    marginRight: 15,
  },
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  header: {
    padding: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'grey',
    paddingBottom: 10,
  },
  content: {
    padding: 20,
    backgroundColor: '#fff',
    fontWeight: '600',
  },
  titleText: {
    fontWeight: '700',
  },
  contentText: {
    fontSize: 15,
  },
  listImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
});
