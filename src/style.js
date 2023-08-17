import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#ffff'
    },
    header: {
        flex:1
    },
    box_header:{
        height:50,
        borderBottomColor:'#2311',
        borderBottomWidth:2,
        alignItems:'center',
        justifyContent:'space-between',
        flexDirection:'row'
    },
    box_icon: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 70,
        width: 70,
        marginHorizontal: 5,

      },
    boder_icon: {
        borderColor: 'red',
        borderRadius: 50,
        borderWidth: 1,
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
      },
    titleHeader:{
        alignItems:'center',
        flexDirection:'row'
    },
    logo: {
        height: 50,
        width: 50,
        marginVertical:20

    },
    imgs:{
        height: 20,
        width: 20,
        marginVertical: 10,
        marginHorizontal:10,
        paddingRight:20
    },
    body: {
        flex:6,
    },
    body_up: {

    },
    input:{
        paddingHorizontal : 10,
        color:'black'
    },
    setWidth:{
        width:'60%'
    },
    box_pass:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around',
   
    },
    boxinput: {
       borderBottomColor:'#0012',
       borderBottomWidth:1,
       flexDirection:'row',
       marginHorizontal:20,
       
    },
    btnlog:{
        backgroundColor:'red',
        marginHorizontal:20,
        marginVertical:10,
        paddingHorizontal : 20,
        paddingVertical:10,
        alignItems:'center',
        justifyContent:'center'

    },
    line:{
        flex:1,
        height:2,
        width:30,
        backgroundColor:'#0012',
        marginHorizontal:10
    },
    body_down: {
        flex: 3,
    },
    box:{
        borderWidth: 1,
        borderColor: 'black',
        marginHorizontal:20,
        marginVertical:10,
        flexDirection:'row',
        
    },
    center:{
        width:'80%',
        alignItems:'center',
        justifyContent:'center'
    },
    footer: {
        flex: 0.5,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#2311'
    },
    blue:{
        color:'blue',
        fontSize:15,
    },
    black:{
        color:'black',
        fontSize:15,
        fontWeight:'bold'
    },
    anh:{
        height:50,
        width:50,
        marginHorizontal:2
    },
    icon:{
        height:30,
        width:30,
        margin:10
    }


})

export default styles