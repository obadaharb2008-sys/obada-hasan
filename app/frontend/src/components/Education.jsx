import React from "react";
import { GraduationCap } from "lucide-react";
import { schools } from "../mock";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import "./Education.css";

const Education = ({ language }) => {
  return (
    <section id="education" className="education-section">
      <div className="education-container">
        <div className="education-header">
          <GraduationCap size={48} className="education-icon" />
          <h2 className="section-title">
            {language === "en" ? "Educational Journey" : "المسيرة التعليمية"}
          </h2>
        </div>

        <Card className="schools-card">
          <CardHeader>
            <CardTitle className="card-title">
              {language === "en" ? "Schools Attended" : "المدارس التي درست فيها"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="table-wrapper">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="table-head">
                      {language === "en" ? "#" : "الرقم"}
                    </TableHead>
                    <TableHead className="table-head">
                      {language === "en" ? "School Name" : "اسم المدرسة"}
                    </TableHead>
                    <TableHead className="table-head">
                      {language === "en" ? "Academic Period" : "الفترة الدراسية"}
                    </TableHead>
                    <TableHead className="table-head">
                      {language === "en" ? "Grade Level" : "المستوى التعليمي"}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {schools.map((school) => (
                    <TableRow key={school.id} className="table-row">
                      <TableCell className="table-cell">{school.id}</TableCell>
                      <TableCell className="table-cell school-name">
                        {school.name[language]}
                      </TableCell>
                      <TableCell className="table-cell">{school.year[language]}</TableCell>
                      <TableCell className="table-cell">{school.grade[language]}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Education;