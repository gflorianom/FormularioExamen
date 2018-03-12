<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">
<html>
<head>
<style rel="stylesheet" type="text/css">
html{font-family: 'Handlee', cursive;}
table{width:100%;border:2px solid;border-radius: 15px;border-color:#2e1736}
th{background-color:#b882c9}
td,tr,th{border:2px solid;padding:2px;vertical-align:top;border-radius: 15px;border-color:#2e1736}
span{color:green;padding-left:5px}
body{background-color: #d6b8e0;}
h2{text-align:center}
h5{text-align:right}
td{background-color:#f5ccff;}
</style>
</head>
<body>
  <h2>Corrección del test</h2>
  <h5> Indica la respuesta correcta: <span>&#x2714;</span></h5>
  <table>
    <tr>
      <th>Pregunta</th>
      <th>Opciónes</th>
      <th>Respuestas usuario</th>
    </tr>



    <xsl:for-each select="questions/question">      
    <tr>

      <td><xsl:value-of select="title"/></td>
      <td>
       <xsl:for-each select="answer">
        <xsl:choose>
         <xsl:when test="../type = 'text'">
          <span><xsl:value-of select="text()"/></span>
         </xsl:when>
        </xsl:choose>         
       </xsl:for-each>
       <xsl:for-each select="option">
         <xsl:variable name="optposition" select="position()-1"/>
        O<xsl:value-of select="$optposition+1"/>: <xsl:value-of select="text()"/>
         <xsl:for-each select="../answer">
          <xsl:variable name="correctanswer" select="text()"/>
          <xsl:if test="$optposition=$correctanswer">
            <span>&#x2714;</span>
          </xsl:if>
         </xsl:for-each>
         <br/><br/>
       </xsl:for-each>
      </td>
      <td>
       <xsl:for-each select="useranswer">
        <xsl:variable name="useranswers" select="text()"/>
        <xsl:value-of select="text()"/>
        <xsl:for-each select="../answer">
          <xsl:choose>
           <xsl:when test="../type = 'text'">
            <xsl:variable name="correctanswertext" select="text()"/>
            <xsl:if test="$useranswers=$correctanswertext">
              <span></span>
            </xsl:if>
           </xsl:when>
           <xsl:otherwise>
            <xsl:variable name="correctanswer" select="text()+1"/>
            <xsl:if test="$useranswers=$correctanswer">
              <span>&#x2714;</span>
            </xsl:if>
           </xsl:otherwise>
          </xsl:choose>
         </xsl:for-each><br/><br/>
       </xsl:for-each>       
     </td>
    </tr>


    </xsl:for-each>
  </table>
 </body>
 </html>
</xsl:template>

</xsl:stylesheet>